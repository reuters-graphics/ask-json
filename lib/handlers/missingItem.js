const prepareObjectPath = require('../utils/prepareObjectPath');
const set = require('lodash/set');
const get = require('lodash/get');

const pushToPath = (data, updatePath, item = null) => {
  const arr = get(data, updatePath);
  arr.push(item);
  set(data, updatePath, arr);
};

module.exports = async(error, data, injectAnswers) => {
  return new Promise((resolve, reject) => {
    const { parentSchema, dataPath } = error;
    const updatePath = prepareObjectPath(dataPath);

    if (parentSchema.items.type === 'object') {
      pushToPath(data, updatePath, {});
    }
    if (parentSchema.items.type === 'array') {
      pushToPath(data, updatePath, []);
    }
    if (
      parentSchema.items.type === 'number' ||
      parentSchema.items.type === 'integer' ||
      parentSchema.items.type === 'string' ||
      parentSchema.items.type === 'boolean' ||
      parentSchema.items.type === 'null'
    ) {
      pushToPath(data, updatePath, null);
    }
    resolve();
  });
};
