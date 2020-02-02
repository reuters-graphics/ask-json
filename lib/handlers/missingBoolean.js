import formatMessage from '../utils/formatMessage';
import humanize from '../utils/humanizeValueName';
import prepareObjectPath from '../utils/prepareObjectPath';
import set from 'lodash/set';

export default async(error, data, injectAnswers) => {
  const prompts = require('prompts');
  const { params, schema, dataPath } = error;
  const updatePath = prepareObjectPath(dataPath, params.missingProperty);

  if (updatePath in injectAnswers) {
    prompts.inject([injectAnswers[updatePath]]);
  }

  const promptOpts = schema[params.missingProperty].prompt || {};

  const prompt = Object.assign(
    { type: 'confirm' },
    promptOpts,
    {
      name: updatePath,
      message: formatMessage(
        updatePath,
        promptOpts,
        `Should the value of ${humanize(updatePath)} be true?\n`
      ),
    }
  );

  const answers = await prompts([prompt], { onCancel: () => { process.exit(); } });

  set(data, updatePath, answers[updatePath]);
};
