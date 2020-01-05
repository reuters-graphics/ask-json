const expect = require('expect.js');
const askJSON = require('../lib');

describe('Test invalid number', function() {
  it('Should ask for an invalid number', async function() {
    const schema = {
      type: 'object',
      properties: {
        num: {
          type: 'number',
        },
        obj: {
          type: 'object',
          properties: {
            nestedNum: {
              type: 'number',
            },
          },
        },
        arr: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    };
    const testData = {
      num: 'not a num',
      obj: { nestedNum: 'not a num' },
      arr: [null],
    };
    const injectAnswers = {
      num: 1,
      'obj.nestedNum': 2,
      'arr[0]': 3,
    };
    const data = await askJSON(schema, testData, injectAnswers);
    expect(data.num).to.be(1);
    expect(data.obj.nestedNum).to.be(2);
    expect(data.arr[0]).to.be(3);
  });

  it('Should ask for a number failing validation keywords', async function() {
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
          ask: {
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
    const injectAnswers = {
      min: 6,
      max: 4,
      multiple: 9,
      'obj.nestedMin': 20,
    };
    const data = await askJSON(schema, testData, injectAnswers);
    expect(data.min).to.be(6);
    expect(data.max).to.be(4);
    expect(data.multiple).to.be(9);
    expect(data.obj.nestedMin).to.be(20);
  });
});
