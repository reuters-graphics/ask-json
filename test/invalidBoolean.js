const expect = require('expect.js');
const promptSchema = require('..');

describe('Test invalid boolean', function() {
  it('Should prompt for an invalid boolean', async function() {
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
      },
    };
    const testData = {
      bool: 'not a boolean',
      obj: { nestedBool: 'not a boolean' },
    };
    const testValues = {
      bool: true,
      'obj.nestedBool': false,
    };
    const data = await promptSchema(schema, testData, testValues);
    expect(data.bool).to.be(true);
    expect(data.obj.nestedBool).to.be(false);
  });
});
