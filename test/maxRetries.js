const expect = require('expect.js');
const askJSON = require('../dist');

describe('Test hitting maximum retries', function() {
  it('Should throw MaxRetriesError', async function() {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 20 },
      },
      required: ['name'],
    };
    const injectedAnswers = { name: 'Jon' };
    try {
      await askJSON(schema, {}, { injectedAnswers });
      expect(true).to.be(false);
    } catch (e) {
      expect(e.name).to.be('MaxRetriesError');
    }
  });
});
