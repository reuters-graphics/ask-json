const Ajv = require('ajv');
const evaluateError = require('./evaluateError');

// Need to capture process exit explicitly, as prompts
// handles this differently to escape each question...
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') process.exit();
});

const ajv = new Ajv({ allErrors: true, verbose: true });

const handleErrors = async({ errors }, data, injectAnswers) => {
  for (const error of errors) {
    await evaluateError(error, data, injectAnswers);
  }
};

const askJSON = async(schema, data, injectAnswers = {}, maxRecursion = 100) => {
  let valid = false;
  let validate;
  let i = 0;

  try {
    validate = ajv.compile(schema);
  } catch (e) {
    console.error(`\n⛔ Invalid JSON schema!\n${e}\n`);
    process.exit(1);
  }

  while (!valid && i < maxRecursion) {
    valid = validate(data);
    if (!valid) {
      await handleErrors(validate, data, injectAnswers);
    }
    i += 1;
  }
  return data;
};

module.exports = askJSON;
