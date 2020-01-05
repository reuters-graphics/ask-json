const prepareObjectPath = require('../utils/prepareObjectPath');
const formatMessage = require('../utils/formatMessage');
const humanize = require('../utils/humanizeValueName');
const set = require('lodash/set');

module.exports = async(error, data, injectAnswers) => {
  const prompts = require('prompts');
  const { dataPath, parentSchema } = error;
  const updatePath = prepareObjectPath(dataPath);

  if (updatePath in injectAnswers) {
    prompts.inject([injectAnswers[updatePath]]);
  }

  const promptOpts = parentSchema.prompt || {};

  const prompt = Object.assign(
    { type: 'confirm' },
    promptOpts,
    {
      name: updatePath,
      message: formatMessage(
        updatePath,
        promptOpts,
        `Should ${humanize(updatePath)} be true?\n`
      ),
    }
  );

  const answers = await prompts([prompt]);

  set(data, updatePath, answers[updatePath]);
};
