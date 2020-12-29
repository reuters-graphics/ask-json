const expect = require('expect.js');
const askJSON = require('../dist');

describe('Test missing items in an array', function() {
  it('Should ask for missing objects in an array', async function() {
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
              contacts: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                    },
                  },
                  required: ['email'],
                },
                minItems: 1,
              },
            },
            required: ['name', 'contacts'],
          },
          minItems: 2,
        },
      },
    };
    const testData = { collection: [] };
    const injectedAnswers = {
      'collection[0].name': 'Jon',
      'collection[0].contacts[0].email': 'jon.r.mcclure@gmail.com',
      'collection[1].name': 'Lisa',
      'collection[1].contacts[0].email': 'lisa@gmail.com',
    };
    const data = await askJSON(schema, testData, { injectedAnswers });
    expect(data.collection[0].name).to.be('Jon');
    expect(data.collection[1].contacts[0].email).to.be('lisa@gmail.com');
  });

  it('Should ask for missing arrays in an array', async function() {
    const schema = {
      type: 'object',
      properties: {
        collection: {
          type: 'array',
          items: {
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 2,
          },
          minItems: 1,
        },
      },
    };
    const testData = { collection: [] };
    const injectedAnswers = {
      'collection[0][0]': 'Jon',
      'collection[0][1]': 'Lisa',
    };
    const data = await askJSON(schema, testData, { injectedAnswers });
    expect(data.collection[0][0]).to.be('Jon');
    expect(data.collection[0][1]).to.be('Lisa');
  });

  it('Should ask for missing strings in an array', async function() {
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
    const injectedAnswers = {
      'collection[0]': 'j@gmail.com',
      'collection[1]': 'l@gmail.com',
    };
    const data = await askJSON(schema, testData, { injectedAnswers });
    expect(data.collection[0]).to.be('j@gmail.com');
    expect(data.collection[1]).to.be('l@gmail.com');
  });

  it('Should ask for missing numbers in an array', async function() {
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
    const injectedAnswers = {
      'collection[0]': 1,
      'collection[1]': 2,
    };
    const data = await askJSON(schema, testData, { injectedAnswers });
    expect(data.collection[0]).to.be(1);
    expect(data.collection[1]).to.be(2);
  });

  it('Should ask for missing booleans in an array', async function() {
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
    const injectedAnswers = {
      'collection[0]': true,
    };
    const data = await askJSON(schema, testData, { injectedAnswers });
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
    const data = await askJSON(schema, testData);
    expect(data.collection[0]).to.be(null);
    expect(data.collection[1]).to.be(null);
  });
});
