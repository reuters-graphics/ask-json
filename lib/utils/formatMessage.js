import chalk from 'chalk';
import chalkTemplate from 'chalk/source/templates';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

const getValidationMessage = (error) => {
  switch (error.keyword) {
    case 'required':
    case 'type':
      return '';
    default:
      return error.message ? chalk` {cyan (${error.message})}` : '';
  }
};

const getValidationHeader = (error, updatePath) => {
  const { keyword, schema, params } = error;
  switch (keyword) {
    case 'required':
      return chalk`{cyan MISSING VALUE}: {green ${updatePath}} {gray (${schema[params.missingProperty].type})}`;
    case 'type':
      return chalk`{cyan MISSING VALUE}: {green ${updatePath}} {gray (${params.type})}`;
    default:
      return chalk`{cyan INVALID VALUE}: {green ${updatePath}}`;
  }
};

const getCustomMessage = (error) => {
  const { params, schema, keyword, parentSchema } = error;
  switch (keyword) {
    case 'required':
      return get(schema[params.missingProperty].prompt || {}, 'message', null);
    default:
      return get(parentSchema.prompt || {}, 'message', null);
  }
};

export default (updatePath, error, defaultMessage, currentData) => {
  const validationMessage = getValidationMessage(error);
  const validationHeader = getValidationHeader(error, updatePath);
  const customMessage = getCustomMessage(error);

  if (!customMessage) return `${validationHeader}\n${defaultMessage}${validationMessage}\n`;
  // If customMessage is a func, give full control of prompt to user
  if (isFunction(customMessage)) return customMessage(updatePath, error, get(currentData, updatePath));
  // ... if string, still wrap with validation header and message
  return `${validationHeader}\n${chalkTemplate(chalk, customMessage)}${validationMessage}\n`;
};
