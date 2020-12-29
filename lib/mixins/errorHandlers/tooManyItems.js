import chalk from 'chalk';
import get from 'lodash/get';
import prepareObjectPath from '../../utils/prepareObjectPath';
import prompts from 'prompts';
import set from 'lodash/set';

export default {
  async handleTooManyItems(error) {
    const { dataPath } = error;
    const { limit } = error.params;
    const updatePath = prepareObjectPath(dataPath);

    this.injectPrompts(updatePath);

    const prompt = {
      name: updatePath,
      type: 'confirm',
      message: chalk`There are too many items in the array at {green ${updatePath}}. Do you want to automatically reduce them, keeping the first {green ${limit}} items? Selecting "No" will exit the program.`,
    };

    const answers = await prompts([prompt], { onCancel: this.handleExit });

    if (answers[updatePath]) {
      const arr = get(this.data, updatePath);
      set(this.data, updatePath, arr.slice(0, limit));
    } else {
      this.handleExit();
    }
  },
};
