const prepareObjectPath = require('../utils/prepareObjectPath');
const set = require('lodash/set');

module.exports = (error, data) => {
  const { params, dataPath } = error;
  const updatePath = prepareObjectPath(dataPath, params.missingProperty);
  set(data, updatePath, {});
};
