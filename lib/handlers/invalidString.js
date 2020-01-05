const prepareObjectPath = require('../utils/prepareObjectPath');
const formatMessage = require('../utils/formatMessage');
const humanize = require('../utils/humanizeValueName');
const set = require('lodash/set');
const chalk = require('chalk');

module.exports = async(error, data, injectAnswers) => {
  const prompts = require('prompts');
  const { dataPath, message: validationMessage, parentSchema } = error;
  const updatePath = prepareObjectPath(dataPath);

  if (updatePath in injectAnswers) {
    prompts.inject([injectAnswers[updatePath]]);
  }

  const promptOpts = parentSchema.prompt || {};

  const prompt = Object.assign(
    { type: 'text' },
    promptOpts,
    {
      name: updatePath,
      message: formatMessage(
        updatePath,
        promptOpts,
        `What should the value of ${humanize(updatePath)} be?\n${chalk.red(validationMessage)})`,
        validationMessage
      ),
    }
  );

  const answers = await prompts([prompt]);

  set(data, updatePath, answers[updatePath]);
};
