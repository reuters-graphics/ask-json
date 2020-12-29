const expect = require('expect.js');
const askJSON = require('../dist');

describe('Test invalid JSON schema given to CLI', function() {
  it('Should throw InvalidJsonSchemaError', async function() {
    const schema = {
      type: 'object',
      properties: {
        type: 'number',
      },
    };
    try {
      await askJSON(schema, {});
      expect(true).to.be(false);
    } catch (e) {
      expect(e.name).to.be('InvalidJsonSchemaError');
    }
  });
});
