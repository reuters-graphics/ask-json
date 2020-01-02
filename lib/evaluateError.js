const handleMissingProperty = require('./handlers/missingProperty');
const handleInvalidNumber = require('./handlers/invalidNumber');
const handleInvalidString = require('./handlers/invalidString');
const handleInvalidBoolean = require('./handlers/invalidBoolean');
const handleMissingItem = require('./handlers/missingItem');
const handleInvalidNull = require('./handlers/invalidNull');

module.exports = async(error, data, testValues) => {
  const { params, parentSchema, keyword } = error;
  // Handles missing number, integer, string, boolean, array, object or null
  if (params.missingProperty) {
    return handleMissingProperty(error, data, testValues);
  }
  // Handles invalid number or integer
  if (
    parentSchema.type === 'number' ||
    parentSchema.type === 'integer'
  ) {
    return handleInvalidNumber(error, data, testValues);
  }
  // Handles invalid string
  if (parentSchema.type === 'string') {
    return handleInvalidString(error, data, testValues);
  }
  // Handles invalid boolean
  if (parentSchema.type === 'boolean') {
    return handleInvalidBoolean(error, data, testValues);
  }
  // Handles invalid null
  if (parentSchema.type === 'null') {
    return handleInvalidNull(error, data, testValues);
  }
  // Handles missing items
  if (keyword === 'minItems') {
    return handleMissingItem(error, data, testValues);
  }
};

// Valid JSON schema types:
// number, integer, string, boolean, array, object or null
