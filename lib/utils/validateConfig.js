import Ajv from 'ajv';
import { InvalidConfigError } from '../errors';
import merge from 'lodash/merge';

const schema = {
  type: 'object',
  properties: {
    maxRetries: {
      type: 'number',
      minValue: 1,
      maxValue: 100,
    },
    injectedAnswers: {
      type: 'object',
    },
    askToAddItems: {
      type: 'boolean',
    },
  },
};

const defaultConfig = {
  maxRetries: 3,
  injectedAnswers: {},
  askToAddItems: false,
};

export default (userConfig) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(schema, userConfig);
  if (!valid) throw new InvalidConfigError(validate.errors.toString());
  return merge({}, defaultConfig, userConfig);
};
