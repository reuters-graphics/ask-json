import { InvalidJsonSchemaError, MaxRetriesError } from './errors';

import Ajv from 'ajv';
import addItem from './mixins/addItem';
import handleError from './mixins/handleError';
import handleExit from './mixins/handleExit';
import injectPrompts from './mixins/injectPrompts';
import isEqual from 'lodash/isEqual';
import uniqBy from 'lodash/uniqBy';

export default class ErrorHandler {
  constructor(schema, data, config) {
    this.schema = schema;
    this.data = data;
    this.config = config;
    Object.assign(
      this,
      handleError,
      handleExit,
      injectPrompts,
      addItem
    );
  }

  async handleErrors() {
    const ajv = new Ajv({ allErrors: true, verbose: true });

    let validate;

    try {
      validate = ajv.compile(this.schema);
    } catch (e) {
      throw new InvalidJsonSchemaError(e.toString());
    }

    let valid = false;
    let lastErrors = null;
    let errorRetryCount = 0;

    while (!valid && errorRetryCount < this.config.maxRetries) {
      valid = validate(this.data);

      // Because some values will trip multiple validation errors, just get unique
      // errors. This will also mean a single, root-level required keyword will be asked on
      // each loop because dataPath is '', but it's OK, b/c we will continue to loop through
      // until there are no validation errors, or the same validation errors are tried
      // too many times.
      const validationErrors = uniqBy(validate.errors, 'dataPath');

      if (isEqual(lastErrors, validationErrors)) {
        errorRetryCount += 1;
      } else {
        errorRetryCount = 0;
        lastErrors = validationErrors;
      }
      if (!valid) {
        for (const error of validationErrors) await this.handleError(error);
      }
    }

    if (errorRetryCount === this.config.maxRetries) throw new MaxRetriesError('Too many retries of the same error');
  }
}
