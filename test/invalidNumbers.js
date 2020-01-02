const expect = require('expect.js');
const promptSchema = require('..');

describe('Test invalid number', function() {
  it('Should prompt for a number failing validation keywords', async function() {
    const schema = {
      type: 'object',
      properties: {
        min: {
          type: 'number',
          minimum: 5,
        },
        max: {
          type: 'number',
          maximum: 5,
          prompt: {
            message: 'This should be a special number?',
          },
        },
        multiple: {
          type: 'number',
          multipleOf: 3,
        },
        obj: {
          type: 'object',
          properties: {
            nestedMin: {
              type: 'number',
              minimum: 10,
            },
          },
        },
      },
    };
    const testData = { min: 4, max: 6, multiple: 10, obj: { nestedMin: 2 } };
    const testValues = {
      min: 6,
      max: 4,
      multiple: 9,
      'obj.nestedMin': 20,
    };
    const data = await promptSchema(schema, testData, testValues);
    expect(data.min).to.be(6);
    expect(data.max).to.be(4);
    expect(data.multiple).to.be(9);
    expect(data.obj.nestedMin).to.be(20);
  });
});
