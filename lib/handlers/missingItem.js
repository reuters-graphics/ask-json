const prepareObjectPath = require('../utils/prepareObjectPath');
const objectPath = require('object-path');

module.exports = async(error, data, testValues) => {
  return new Promise((resolve, reject) => {
    const { parentSchema, dataPath } = error;
    const updatePath = prepareObjectPath(dataPath);

    if (parentSchema.items.type === 'object') {
      objectPath.push(data, updatePath, {});
    }
    if (parentSchema.items.type === 'array') {
      objectPath.push(data, updatePath, []);
    }
    if (
      parentSchema.items.type === 'number' ||
      parentSchema.items.type === 'integer' ||
      parentSchema.items.type === 'string' ||
      parentSchema.items.type === 'boolean' ||
      parentSchema.items.type === 'null'
    ) {
      objectPath.push(data, updatePath, null);
    }
    resolve();
  });
};
