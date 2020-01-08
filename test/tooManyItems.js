const expect = require('expect.js');
const askJSON = require('../lib');

describe('Test too many items', function() {
  it('Should ask to limit items', async function() {
    const schema = {
      type: 'object',
      properties: {
        arr: {
          type: 'array',
          items: {
            type: 'number',
          },
          maxItems: 3,
        },
        key: {
          type: 'object',
          properties: {
            nestedComplexArr: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                },
              },
              maxItems: 2,
            },
          },
        },
      },
    };
    const testData = {
      arr: [1, 2, 3, 4],
      key: {
        nestedComplexArr: [{
          name: 'Virginia',
        }, {
          name: 'Texas',
        }, {
          name: 'Missouri',
        }],
      },
    };
    const injectAnswers = {
      arr: true,
      'key.nestedComplexArr': true,
    };
    const data = await askJSON(schema, testData, injectAnswers);
    expect(data.arr).to.have.length(3);
    expect(data.arr).to.contain(2);
    expect(data.key.nestedComplexArr).to.have.length(2);
    expect(data.key.nestedComplexArr[0]).to.eql({ name: 'Virginia' });
  });
});
