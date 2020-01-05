const prepareObjectPath = require('../utils/prepareObjectPath');
const set = require('lodash/set');

module.exports = async(error, data, injectAnswers) => {
  const { dataPath } = error;
  const updatePath = prepareObjectPath(dataPath);

  set(data, updatePath, null);
};
