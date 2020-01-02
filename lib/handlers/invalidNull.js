const prepareObjectPath = require('../utils/prepareObjectPath');
const set = require('lodash/set');

module.exports = async(error, data, testValues) => {
  const { dataPath } = error;
  const updatePath = prepareObjectPath(dataPath);

  set(data, updatePath, null);
};
