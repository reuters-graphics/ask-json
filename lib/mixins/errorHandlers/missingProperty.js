export default {
  async handleMissingProperty(error) {
    const { params, schema } = error;
    switch (schema[params.missingProperty].type) {
      case 'object':
        await this.handleMissingObject(error);
        break;
      case 'array':
        await this.handleMissingArray(error);
        break;
      case 'null':
        await this.handleMissingNull(error);
        break;
      case 'string':
        await this.handleMissingString(error);
        break;
      case 'number':
      case 'integer':
        await this.handleMissingNumber(error);
        break;
      case 'boolean':
        await this.handleMissingBoolean(error);
        break;
      default:
        break;
    }
  },
};

// Valid JSON schema types:
// number, integer, string, boolean, array, object or null
