import chalk from 'chalk';
import get from 'lodash/get';
import prepareObjectPath from '../utils/prepareObjectPath';
import set from 'lodash/set';

export default async(error, data, injectAnswers) => {
  const prompts = require('prompts');
  const { dataPath } = error;
  const { limit } = error.params;
  const updatePath = prepareObjectPath(dataPath);

  if (updatePath in injectAnswers) {
    prompts.inject([injectAnswers[updatePath]]);
  }

  const prompt = {
    name: updatePath,
    type: 'confirm',
    message: `There are too many items in the array at ${chalk.underline.green(updatePath)}. Do you want to automatically reduce them, keeping the first ${chalk.underline.green(limit)} items? Selecting "No" will exit the program.`,
  };

  const answers = await prompts([prompt], { onCancel: () => { process.exit(); } });

  if (answers[updatePath]) {
    const arr = get(data, updatePath);
    set(data, updatePath, arr.slice(0, limit));
  } else {
    console.log('Exiting ask-json...');
    // This should probably be done more elegantly...
    process.exit();
  }
};
