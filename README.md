![](badge.svg)

# ask-json

Easy interactive prompts to create and validate data using [JSON schema](https://json-schema.org/).

[![npm version](https://badge.fury.io/js/ask-json.svg)](https://badge.fury.io/js/ask-json) [![Reuters open source software](https://badgen.net/badge/Reuters/open%20source/?color=ff8000)](https://github.com/reuters-graphics/)


### Why this?

We use JSON files to hold important configuration like the metadata for our published pages. But filling out those files is often tedious and prone to error.

Using [JSON schema](https://json-schema.org/) helps us ensure config files contain the correct information. ask-json gives us a way to make filling out and validating those files easy. It hooks into our publishing process and creates an interactive step to validate configuration before it's used.

### What's it do?

ask-json lets you turn any JSON schema into an interactive CLI prompt. Just create a schema with some validation rules. ask-json will ask for any required information using friendly, data-type specific prompts using [prompts.js](https://www.npmjs.com/package/prompts).

It's best used to check an existing JSON file, correct invalid and missing information and write that data back to the file.

### Install

```
$ npm install ask-json
```

or

```
$ yarn add ask-json
```

### Prereqs: JSON schema

ask-json is driven by JSON schema validation. Check out the [official docs](https://json-schema.org/understanding-json-schema/) to learn more about the spec.

Internally, ask-json uses [ajv](https://ajv.js.org/) to validate data.

### Use

##### CLI

Ask for data based on a JSON schema file.

```
$ askjson jsonSchema.json
```

Validate some data in a file. Answers to invalid or missing data will be rewritten to the file.

```
$ askjson jsonSchema.json -f output.json
```

##### Module

```javascript
import askJSON from 'ask-json';

const jsonSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    author: {
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
  },
  required: ['title', 'author'],
};

const testData = {
  author: { name: 'Jon McClure' },
};

// Will ask user for title and author.email data!
const data = await askJSON(jsonSchema, testData);
```

### Supported validation

As of the current version, ask-json handles simple schema validation rules and not _all_ [keywords](https://ajv.js.org/#validation-keywords) are supported.

These are validation keywords currently handled by type:
- `number` - maximum, minimum, exclusiveMaximum, exclusiveMinimum, multipleOf
- `string` - maxLength, minLength, pattern, format
-  `array` - minItems, items
- `object` - required

Arrays in ask-json can **only contain items of one type.** For example, ask-json does not support this schema:

  ```json
  {
    "type": "array",
    "items": [{
      "type": "number"
    }, {
      "type": "string"
    }]
  }
  ```


Because ask-json uses validation errors to trigger questions, any fields you want to prompt for when missing **must be marked required.** For example, in the following schema, ask-json will never ask for the `email` property _unless it contains invalid data_.

  ```json
  {
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "required": [
      "name"
    ]
  }
  ```


### Customizing questions

You can customize the questions used to ask users for missing or invalid data by adding a `prompt` property to your schema with [prompts.js](https://www.npmjs.com/package/prompts) question options.

There are some conditions: You won't have access to the `name` property on your questions. Also, all functions will **not** have access to any previous answers -- e.g., `(prev, values) => { ... }`.

Lastly, the `message` property does not follow the usual signature in prompts.js. Instead, you can supply a static string or a function which receives two params: the object dot-path of the variable being set and a message from ajv if the current value is invalid.

Here's an example of some custom prompts:

```javascript
const schema = {
  type: 'object',
  email: {
    type: 'string',
    format: 'email',
    prompt: {
      message: (variablePath, invalidMessage = null) => {
        if(!invalidMessage) return 'What\'s your email?'
        return `What\'s your email? (${invalidMessage})`
      }
    }
  }
  color: {
    type: 'color',
    prompt: {
      type: 'select',
      choices: [
        { title: 'Red', value: '#ff0000' },
        { title: 'Green', value: '#00ff00' },
        { title: 'Blue', value: '#0000ff' },
      ],
    }
  }
}
```

### Testing

```
$ yarn build && yarn test
```
