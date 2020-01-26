import isFunction from 'lodash/isFunction';

export default (updatePath, promptOpts, defaultMessage, validationMessage = null) => {
  if (!promptOpts.message) return defaultMessage;
  if (isFunction(promptOpts.message)) return promptOpts.message(updatePath, validationMessage);
  return promptOpts.message;
};
