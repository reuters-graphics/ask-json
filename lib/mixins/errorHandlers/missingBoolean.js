import formatMessage from '../../utils/formatMessage';
import humanize from '../../utils/humanizeValueName';
import prepareObjectPath from '../../utils/prepareObjectPath';
import prompts from 'prompts';
import set from 'lodash/set';

export default {
  async handleMissingBoolean(error) {
    const { params, schema, dataPath } = error;
    const updatePath = prepareObjectPath(dataPath, params.missingProperty);

    this.injectPrompts(updatePath);

    const promptOpts = schema[params.missingProperty].prompt || {};

    const prompt = Object.assign(
      { type: 'confirm' },
      promptOpts,
      {
        name: updatePath,
        message: formatMessage(
          updatePath,
          error,
          `Should the value of ${humanize(updatePath)} be true?`,
          this.data
        ),
      }
    );

    const answers = await prompts([prompt], { onCancel: this.handleExit });

    set(this.data, updatePath, answers[updatePath]);
  },
};
