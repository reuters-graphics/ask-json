const prepareObjectPath = require('../utils/prepareObjectPath');
const set = require('lodash/set');
const chalk = require('chalk');

module.exports = async(error, data, testValues) => {
  const prompts = require('prompts');
  const { dataPath, message, parentSchema } = error;
  const updatePath = prepareObjectPath(dataPath);

  if (updatePath in testValues) {
    prompts.inject([testValues[updatePath]]);
  }

  const prompt = Object.assign(
    {
      type: 'number',
      message: `What should the value of ${chalk.green(updatePath)} be?\n(${message})`,
    },
    parentSchema.prompt || {},
    { name: updatePath }
  );

  const answers = await prompts([prompt]);

  set(data, updatePath, answers[updatePath]);
};
