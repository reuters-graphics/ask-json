const expect = require('expect.js');
const askJSON = require('../dist');

describe('Test missing properties', function() {
  it('Should attach a missing object', async function() {
    const schema = {
      type: 'object',
      properties: {
        missingObject: {
          type: 'object',
          properties: {
            missingNestedObject: {
              type: 'object',
            },
          },
          required: ['missingNestedObject'],
        },
      },
      required: ['missingObject'],
    };
    const data = await askJSON(schema, {});
    expect(data.missingObject).to.be.an('object');
    expect(data.missingObject.missingNestedObject).to.be.an('object');
  });

  it('Should attach a missing array', async function() {
    const schema = {
      type: 'object',
      properties: {
        missingArray: {
          type: 'array',
        },
        object: {
          type: 'object',
          properties: {
            missingNestedArray: {
              type: 'array',
            },
          },
          required: ['missingNestedArray'],
        },
      },
      required: ['missingArray', 'object'],
    };
    const data = await askJSON(schema, {});
    expect(data.missingArray).to.be.an('array');
    expect(data.object.missingNestedArray).to.be.an('array');
  });

  it('Should ask for a missing string', async function() {
    const schema = {
      type: 'object',
      properties: {
        missingString: {
          type: 'string',
        },
        object: {
          type: 'object',
          properties: {
            missingNestedString: {
              type: 'string',
            },
          },
          required: ['missingNestedString'],
        },
      },
      required: ['missingString', 'object'],
    };

    const injectedAnswers = {
      missingString: 'asd',
      'object.missingNestedString': 'qwe',
    };
    const data = await askJSON(schema, {}, { injectedAnswers });
    expect(data.missingString).to.be('asd');
    expect(data.object.missingNestedString).to.be('qwe');
  });

  it('Should ask for a missing number', async function() {
    const schema = {
      type: 'object',
      properties: {
        missingNumber: {
          type: 'number',
        },
        object: {
          type: 'object',
          properties: {
            missingNestedNumber: {
              type: 'number',
            },
          },
          required: ['missingNestedNumber'],
        },
      },
      required: ['missingNumber', 'object'],
    };

    const injectedAnswers = {
      missingNumber: 1,
      'object.missingNestedNumber': 2,
    };
    const data = await askJSON(schema, {}, { injectedAnswers });
    expect(data.missingNumber).to.be(1);
    expect(data.object.missingNestedNumber).to.be(2);
  });

  it('Should ask for a missing boolean', async function() {
    const schema = {
      type: 'object',
      properties: {
        missingBool: {
          type: 'boolean',
        },
        object: {
          type: 'object',
          properties: {
            missingNestedBool: {
              type: 'boolean',
            },
          },
          required: ['missingNestedBool'],
        },
      },
      required: ['missingBool', 'object'],
    };

    const injectedAnswers = {
      missingBool: true,
      'object.missingNestedBool': false,
    };
    const data = await askJSON(schema, {}, { injectedAnswers });
    expect(data.missingBool).to.be(true);
    expect(data.object.missingNestedBool).to.be(false);
  });
});
