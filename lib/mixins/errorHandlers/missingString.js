import formatMessage from '../../utils/formatMessage';
import humanize from '../../utils/humanizeValueName';
import prepareObjectPath from '../../utils/prepareObjectPath';
import prompts from 'prompts';
import set from 'lodash/set';

export default {
  async handleMissingString(error) {
    const { params, schema, dataPath } = error;
    const updatePath = prepareObjectPath(dataPath, params.missingProperty);

    this.injectPrompts(updatePath);

    const promptOpts = schema[params.missingProperty].prompt || {};

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
