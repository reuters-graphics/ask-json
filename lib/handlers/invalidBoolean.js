import formatMessage from '../utils/formatMessage';
import humanize from '../utils/humanizeValueName';
import prepareObjectPath from '../utils/prepareObjectPath';
import set from 'lodash/set';

export default async(error, data, injectAnswers) => {
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

  const answers = await prompts([prompt], { onCancel: () => { process.exit(); } });

  set(data, updatePath, answers[updatePath]);
};
