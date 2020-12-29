const askJSON = require('../../dist');

describe('Test prompting for new item', function() {
  it('Should prompt to add items', async function() {
    this.timeout(60000);
    const schema = {
      type: 'object',
      properties: {
        arrOfStrings: {
          type: 'array',
          items: {
            type: 'string',
          },
          prompt: {
            addMessage: 'Would you like to add a {green new string} to {green arrOfStrings}?',
          },
        },
        arrOfObjects: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
            },
            required: ['name'],
          },
        },
        arrOfArrays: {
          type: 'array',
          items: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
          },
          maxItems: 3,
        },
        arrAlreadyAtMax: {
          type: 'array',
          items: {
            type: 'string',
          },
          maxItems: 1,
        },
      },
      required: ['arrOfStrings', 'arrOfObjects', 'arrOfArrays', 'arrAlreadyAtMax'],
    };

    await askJSON(schema, { arrAlreadyAtMax: ['one'] }, { askToAddItems: true });
  });
});
