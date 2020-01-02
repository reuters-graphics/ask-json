const prepareObjectPath = require('../utils/prepareObjectPath');
const getArrayItemModifier = require('../utils/getArrayItemModifier');
const set = require('lodash/set');
const chalk = require('chalk');

module.exports = async(error, data, testValues) => {
  const prompts = require('prompts');
  const { params, schema, dataPath } = error;
  const updatePath = prepareObjectPath(dataPath, params.missingProperty);

  if (updatePath in testValues) {
    prompts.inject([testValues[updatePath]]);
  }

  const prompt = Object.assign(
    {
      type: 'number',
      message:
        `What should the value of \
${chalk.green(params.missingProperty)} \
be${getArrayItemModifier(updatePath)}?\n`,
    },
    schema.prompt || {},
    { name: updatePath }
  );

  const answers = await prompts([prompt]);

  set(data, updatePath, answers[updatePath]);
};
