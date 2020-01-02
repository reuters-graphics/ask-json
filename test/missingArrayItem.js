const expect = require('expect.js');
const promptSchema = require('..');

describe('Test missing items in an array', function() {
  it('Should prompt for missing objects in an array', async function() {
    const schema = {
      type: 'object',
      properties: {
        collection: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
                format: 'email',
              },
            },
            required: ['name', 'email'],
          },
          minItems: 2,
        },
      },
    };
    const testData = { collection: [] };
    const testValues = {
      'collection[0].name': 'Jon',
      'collection[0].email': 'jon.r.mcclure@gmail.com',
      'collection[1].name': 'Lisa',
      'collection[1].email': 'lisa@gmail.com',
    };
    const data = await promptSchema(schema, testData, testValues);
    expect(data.collection[0].name).to.be('Jon');
    expect(data.collection[1].email).to.be('lisa@gmail.com');
  });

  it('Should prompt for missing strings in an array', async function() {
    const schema = {
      type: 'object',
      properties: {
        collection: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email',
          },
          minItems: 2,
        },
      },
    };
    const testData = { collection: [] };
    const testValues = {
      'collection[0]': 'j@gmail.com',
      'collection[1]': 'l@gmail.com',
    };
    const data = await promptSchema(schema, testData, testValues);
    expect(data.collection[0]).to.be('j@gmail.com');
    expect(data.collection[1]).to.be('l@gmail.com');
  });

  it('Should prompt for missing numbers in an array', async function() {
    const schema = {
      type: 'object',
      properties: {
        collection: {
          type: 'array',
          items: {
            type: 'integer',
          },
          minItems: 2,
        },
      },
    };
    const testData = { collection: [] };
    const testValues = {
      'collection[0]': 1,
      'collection[1]': 2,
    };
    const data = await promptSchema(schema, testData, testValues);
    expect(data.collection[0]).to.be(1);
    expect(data.collection[1]).to.be(2);
  });

  it('Should prompt for missing booleans in an array', async function() {
    const schema = {
      type: 'object',
      properties: {
        collection: {
          type: 'array',
          items: {
            type: 'boolean',
          },
          minItems: 1,
        },
      },
    };
    const testData = { collection: [] };
    const testValues = {
      'collection[0]': true,
    };
    const data = await promptSchema(schema, testData, testValues);
    expect(data.collection[0]).to.be(true);
  });

  it('Should attach missing nulls in an array', async function() {
    const schema = {
      type: 'object',
      properties: {
        collection: {
          type: 'array',
          items: {
            type: 'null',
          },
          minItems: 2,
        },
      },
    };
    const testData = { collection: [] };
    const data = await promptSchema(schema, testData);
    expect(data.collection[0]).to.be(null);
    expect(data.collection[1]).to.be(null);
  });
});
