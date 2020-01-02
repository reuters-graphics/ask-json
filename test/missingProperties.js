const expect = require('expect.js');
const promptSchema = require('..');

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
    const data = await promptSchema(schema, {});
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
    const data = await promptSchema(schema, {});
    expect(data.missingArray).to.be.an('array');
    expect(data.object.missingNestedArray).to.be.an('array');
  });

  it('Should prompt for a missing string', async function() {
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

    const testValues = {
      missingString: 'asd',
      'object.missingNestedString': 'qwe',
    };
    const data = await promptSchema(schema, {}, testValues);
    expect(data.missingString).to.be('asd');
    expect(data.object.missingNestedString).to.be('qwe');
  });

  it('Should prompt for a missing number', async function() {
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

    const testValues = {
      missingNumber: 1,
      'object.missingNestedNumber': 2,
    };
    const data = await promptSchema(schema, {}, testValues);
    expect(data.missingNumber).to.be(1);
    expect(data.object.missingNestedNumber).to.be(2);
  });

  it('Should prompt for a missing boolean', async function() {
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

    const testValues = {
      missingBool: true,
      'object.missingNestedBool': false,
    };
    const data = await promptSchema(schema, {}, testValues);
    expect(data.missingBool).to.be(true);
    expect(data.object.missingNestedBool).to.be(false);
  });
});
