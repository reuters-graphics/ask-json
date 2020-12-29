const expect = require('expect.js');
const askJSON = require('../../dist');

describe('Test message formatting', function() {
  it('Should format invalid strings', async function() {
    this.timeout(60000);
    const schema = {
      type: 'object',
      properties: {
        str: {
          type: 'string',
          prompt: {
            message: 'Answer {green "D"} first to this question, then {green "Data"} to trip multiple validation steps',
          },
          minLength: 3,
          pattern: 'Data',
        },
        num: {
          type: 'number',
          minimum: 5,
          maximum: 10,
        },
        arrOfStrings: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
            minLength: 2,
          },
        },
        email: {
          type: 'string',
          format: 'email',
        },
      },
      required: ['str', 'arrOfStrings', 'num', 'email'],
    };

    const data = await askJSON(schema, { num: 'JJJ' });
    expect(data.str).to.be('Data');
  });
});
