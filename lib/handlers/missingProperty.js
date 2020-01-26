import handleMissingArray from './missingArray';
import handleMissingBoolean from './missingBoolean';
import handleMissingNull from './missingNull';
import handleMissingNumber from './missingNumber';
import handleMissingObject from './missingObject';
import handleMissingString from './missingString';

export default async(error, data, injectAnswers) => {
  const { params, schema } = error;
  switch (schema[params.missingProperty].type) {
    case 'object':
      await handleMissingObject(error, data);
      break;
    case 'array':
      await handleMissingArray(error, data);
      break;
    case 'null':
      await handleMissingNull(error, data);
      break;
    case 'string':
      await handleMissingString(error, data, injectAnswers);
      break;
    case 'number':
    case 'integer':
      await handleMissingNumber(error, data, injectAnswers);
      break;
    case 'boolean':
      await handleMissingBoolean(error, data, injectAnswers);
      break;
    default:
      break;
  }
};

// Valid JSON schema types:
// number, integer, string, boolean, array, object or null
