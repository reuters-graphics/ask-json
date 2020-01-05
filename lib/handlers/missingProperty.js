const handleMissingObject = require('./missingObject');
const handleMissingArray = require('./missingArray');
const handleMissingNull = require('./missingNull');
const handleMissingString = require('./missingString');
const handleMissingNumber = require('./missingNumber');
const handleMissingBoolean = require('./missingBoolean');

module.exports = async(error, data, injectAnswers) => {
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
