const expect = require('expect.js');
const askJSON = require('../dist');

describe('Test invalid boolean', function() {
  it('Should ask for an invalid boolean', async function() {
    const schema = {
      type: 'object',
      properties: {
        bool: {
          type: 'boolean',
        },
        obj: {
          type: 'object',
          properties: {
            nestedBool: {
              type: 'boolean',
            },
          },
        },
        arr: {
          type: 'array',
          items: {
            type: 'boolean',
          },
        },
      },
    };
    const testData = {
      bool: 'not a boolean',
      obj: { nestedBool: 'not a boolean' },
      arr: ['not a boolean'],
    };
    const injectAnswers = {
      bool: true,
      'obj.nestedBool': false,
      'arr[0]': true,
    };
    const data = await askJSON(schema, testData, injectAnswers);
    expect(data.bool).to.be(true);
    expect(data.obj.nestedBool).to.be(false);
    expect(data.arr[0]).to.be(true);
  });
});
