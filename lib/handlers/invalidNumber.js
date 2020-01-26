import chalk from 'chalk';
import formatMessage from '../utils/formatMessage';
import humanize from '../utils/humanizeValueName';
import prepareObjectPath from '../utils/prepareObjectPath';
import set from 'lodash/set';

export default async(error, data, injectAnswers) => {
  const prompts = require('prompts');
  const { dataPath, message: validationMessage, parentSchema } = error;
  const updatePath = prepareObjectPath(dataPath);

  if (updatePath in injectAnswers) {
    prompts.inject([injectAnswers[updatePath]]);
  }

  const promptOpts = parentSchema.prompt || {};

  const prompt = Object.assign(
    { type: 'number' },
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
