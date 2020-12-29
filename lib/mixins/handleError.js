import invalidBoolean from './errorHandlers/invalidBoolean';
import invalidNull from './errorHandlers/invalidNull';
import invalidNumber from './errorHandlers/invalidNumber';
import invalidString from './errorHandlers/invalidString';
import missingArray from './errorHandlers/missingArray';
import missingBoolean from './errorHandlers/missingBoolean';
import missingItem from './errorHandlers/missingItem';
import missingNull from './errorHandlers/missingNull';
import missingNumber from './errorHandlers/missingNumber';
import missingObject from './errorHandlers/missingObject';
import missingProperty from './errorHandlers/missingProperty';
import missingString from './errorHandlers/missingString';
import tooManyItems from './errorHandlers/tooManyItems';

const errorHandler = {
  async handleError(error) {
    const { params, parentSchema, keyword } = error;
    // Handles missing number, integer, string, boolean, array, object or null
    if (params.missingProperty) {
      await this.handleMissingProperty(error);
    }
    // Handles invalid number or integer
    if (
      parentSchema.type === 'number' ||
      parentSchema.type === 'integer'
    ) {
      await this.handleInvalidNumber(error);
    }
    // Handles invalid string
    if (parentSchema.type === 'string') {
      await this.handleInvalidString(error);
    }
    // Handles invalid boolean
    if (parentSchema.type === 'boolean') {
      await this.handleInvalidBoolean(error);
    }
    // Handles invalid null
    if (parentSchema.type === 'null') {
      await this.handleInvalidNull(error);
    }
    // Handles missing items
    if (keyword === 'minItems') {
      await this.handleMissingItem(error);
    }
    // Handles too many items
    if (keyword === 'maxItems') {
      await this.handleTooManyItems(error);
    }
  },
};
// Valid JSON schema types:
// number, integer, string, boolean, array, object or null

export default Object.assign(
  errorHandler,
  invalidBoolean,
  invalidNull,
  invalidNumber,
  invalidString,
  missingArray,
  missingBoolean,
  missingItem,
  missingNull,
  missingNumber,
  missingObject,
  missingProperty,
  missingString,
  tooManyItems
);
