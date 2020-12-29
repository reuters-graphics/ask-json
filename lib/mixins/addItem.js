import chalk from 'chalk';
import chalkTemplate from 'chalk/source/templates';
import get from 'lodash/get';
import prompts from 'prompts';
import range from 'lodash/range';
import traverseSchema from 'json-schema-traverse';

export default {
  async askToAddItems() {
    const promptArrays = [];
    const findArrays = (schema, pointer) => {
      const { type, maxItems } = schema;
      if (type !== 'array') return;
      // Create dot path for array
      const path = pointer.replace(/\//g, '.').replace(/^\.+/, '').replace(/properties\./g, '');
      const data = get(this.data, path);
      if (!data) return; // Will exclude arrays of arrays
      if (maxItems && data.length === maxItems) return;
      promptArrays.push({ data, path, schema });
    };

    traverseSchema(this.schema, { cb: findArrays });

    for (const array of promptArrays) {
      const { path: dataPath, schema: parentSchema } = array;
      const { maxItems } = parentSchema;
      const customMessage = get(parentSchema.prompt || {}, 'addMessage', null);
      prompts._injected = null;
      const { value } = await prompts({
        type: 'confirm',
        name: 'value',
        message: customMessage ? chalkTemplate(chalk, customMessage) : chalk`Would you like to add an item to {green ${dataPath}}?`,
        initial: false,
      });
      if (!value) continue;

      const availableItems = maxItems ? maxItems - get(this.data, dataPath).length : 0;
      let numberOfItems = 1;
      if (availableItems !== 1) {
        const { add } = await prompts({
          type: 'number',
          name: 'add',
          message: 'How many do you want to add?',
          initial: 1,
          min: 1,
          max: availableItems || Infinity,
        });
        numberOfItems = add;
      }

      // We'll create a faux error with what we need to use our existing
      // error handler for missing items.
      const fauxError = { parentSchema, dataPath };
      range(numberOfItems).forEach(() => this.handleMissingItem(fauxError));

      // Lastly, re-check for errors which will add any additional properties or values needed
      // to fill in correct values for the new array item.
      await this.handleErrors();
    }
  },
};
