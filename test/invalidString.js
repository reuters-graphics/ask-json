const expect = require('expect.js');
const askJSON = require('../dist');

describe('Test invalid string', function() {
  it('Should ask for an invalid string', async function() {
    const schema = {
      type: 'object',
      properties: {
        str: {
          type: 'string',
        },
        obj: {
          type: 'object',
          properties: {
            nestedStr: {
              type: 'string',
            },
          },
        },
        arr: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    };
    const testData = {
      str: null,
      obj: { nestedStr: false },
      arr: [null],
    };
    const injectedAnswers = {
      str: 'asd',
      'obj.nestedStr': 'dsa',
      'arr[0]': 'qwe',
    };
    const data = await askJSON(schema, testData, { injectedAnswers });
    expect(data.str).to.be('asd');
    expect(data.obj.nestedStr).to.be('dsa');
    expect(data.arr[0]).to.be('qwe');
  });

  it('Should ask for a string failing validation format', async function() {
    const schema = {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          format: 'date',
        },
        datetime: {
          type: 'string',
          format: 'date-time',
        },
        email: {
          type: 'string',
          format: 'email',
        },
        uri: {
          type: 'string',
          format: 'uri',
        },
      },
    };
    const testData = {
      date: 'not a date',
      datetime: 'not a datetime',
      email: 'not an email',
      uri: 'not a uri',
    };
    const datetime = new Date();
    const injectedAnswers = {
      date: '2012-12-12',
      datetime: datetime.toISOString(),
      email: 'jon.r.mcclure@gmail.com',
      uri: 'http://google.com',
    };
    const data = await askJSON(schema, testData, { injectedAnswers });
    expect(data.date).to.be('2012-12-12');
    expect(data.datetime).to.be(datetime.toISOString());
    expect(data.email).to.be('jon.r.mcclure@gmail.com');
    expect(data.uri).to.be('http://google.com');
  });
});
