const prepareObjectPath = require('../utils/prepareObjectPath');
const set = require('lodash/set');
const chalk = require('chalk');

module.exports = async(error, data, testValues) => {
  const prompts = require('prompts');
  const { dataPath, parentSchema } = error;
  const updatePath = prepareObjectPath(dataPath);

  if (updatePath in testValues) {
    prompts.inject([testValues[updatePath]]);
  }

  const prompt = Object.assign(
    {
      type: 'confirm',
      message: `Should ${chalk.green(updatePath)} be true?\n`,
    },
    parentSchema.prompt || {},
    { name: updatePath }
  );

  const answers = await prompts([prompt]);

  set(data, updatePath, answers[updatePath]);
};
