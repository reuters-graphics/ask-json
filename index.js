const Ajv = require('ajv');
const evaluateError = require('./lib/evaluateError');

const ajv = new Ajv({ allErrors: true, verbose: true });

const handleErrors = async({ errors }, data, testValues) => {
  // Execute each handler in series
  for (const error of errors) {
    await evaluateError(error, data, testValues);
  }
};

const promptSchema = async(schema, data, testValues = {}, testOpts = { returnError: false, returnAfter: 0 }, maxRecursion = 20) => {
  let valid = false;
  let i = 0;
  while (!valid && i < maxRecursion) {
    valid = ajv.validate(schema, data);
    if (!valid) {
      await handleErrors(ajv, data, testValues);
      if (testOpts.returnError && testOpts.returnAfter === i) return ajv.errors;
    }
    i += 1;
  }
  return data;
};

module.exports = promptSchema;
