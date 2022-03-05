import formatMessage from '../../utils/formatMessage';
import humanize from '../../utils/humanizeValueName';
import prepareObjectPath from '../../utils/prepareObjectPath';
import prompts from 'prompts';
import set from 'lodash/set';

export default {
  async handleInvalidString(error) {
    const { dataPath, parentSchema } = error;
    const updatePath = prepareObjectPath(dataPath);

    this.injectPrompts(updatePath);

    const promptOpts = parentSchema.prompt || {};

    const prompt = Object.assign(
      { type: 'text' },
      promptOpts,
      {
        name: updatePath,
        message: formatMessage(
          updatePath,
          error,
          `What should the value of ${humanize(updatePath)} be?`,
          this.data
        ),
      }
    );

    const answers = await prompts.prompt([prompt], { onCancel: this.handleExit });

    set(this.data, updatePath, answers[updatePath]);
  },
};
