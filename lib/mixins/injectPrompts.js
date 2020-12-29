import prompts from 'prompts';

export default {
  injectPrompts(updatePath) {
    const { injectedAnswers } = this.config;
    prompts._injected = null;
    if (updatePath in injectedAnswers) {
      prompts.inject([injectedAnswers[updatePath]]);
    }
  },
};
