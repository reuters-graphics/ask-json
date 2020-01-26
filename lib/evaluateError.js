import handleInvalidBoolean from './handlers/invalidBoolean';
import handleInvalidNull from './handlers/invalidNull';
import handleInvalidNumber from './handlers/invalidNumber';
import handleInvalidString from './handlers/invalidString';
import handleMissingItem from './handlers/missingItem';
import handleMissingProperty from './handlers/missingProperty';
import handleTooManyItems from './handlers/tooManyItems';

export default async(error, data, injectAnswers) => {
  const { params, parentSchema, keyword } = error;
  // Handles missing number, integer, string, boolean, array, object or null
  if (params.missingProperty) {
    return handleMissingProperty(error, data, injectAnswers);
  }
  // Handles invalid number or integer
  if (
    parentSchema.type === 'number' ||
    parentSchema.type === 'integer'
  ) {
    return handleInvalidNumber(error, data, injectAnswers);
  }
  // Handles invalid string
  if (parentSchema.type === 'string') {
    return handleInvalidString(error, data, injectAnswers);
  }
  // Handles invalid boolean
  if (parentSchema.type === 'boolean') {
    return handleInvalidBoolean(error, data, injectAnswers);
  }
  // Handles invalid null
  if (parentSchema.type === 'null') {
    return handleInvalidNull(error, data, injectAnswers);
  }
  // Handles missing items
  if (keyword === 'minItems') {
    return handleMissingItem(error, data, injectAnswers);
  }
  // Handles too many items
  if (keyword === 'maxItems') {
    return handleTooManyItems(error, data, injectAnswers);
  }
};

// Valid JSON schema types:
// number, integer, string, boolean, array, object or null
