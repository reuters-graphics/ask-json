#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ensureFile = require('./utils/ensureFile');
const readJSON = require('./utils/readJSON');
const writeJSON = require('./utils/writeJSON');
const askJSON = require('../lib');
const argv = require('yargs')
  .command('$0 <schema>',
    'Ask users for data based on JSON schema', (yargs) => {
      yargs.positional('schema', {
        describe: 'Path to a JSON schema file.',
        type: 'string',
        coerce: (filePath) => !filePath ? false : path.resolve(process.cwd(), filePath),
      })
        .options({
          file: {
            alias: 'f',
            describe: 'Path to a JSON file. Per the JSON schema, users will be asked to supply missing and correct invalid data. Their answers will be written back to the file.',
            type: 'string',
            coerce: (filePath) => !filePath ? false : path.resolve(process.cwd(), filePath),
          },
          inject: {
            alias: 'i',
            describe: 'Path to a JSON file with test data that will be injected into prompts (for testing purposes).',
            type: 'string',
            coerce: (filePath) => !filePath ? false : path.resolve(process.cwd(), filePath),
          },
        })
        .help()
        .version();
    })
  .argv;

if (!fs.existsSync(argv.schema)) {
  console.error(`\n⛔ Unable to read JSON schema file: ${chalk.green(argv.schema)}\n`);
  process.exit(1);
}

const SCHEMA = readJSON(argv.schema);
const INJECT_ANSWERS = argv.inject && fs.existsSync(argv.inject) ?
  readJSON(argv.inject) : {};
let DATA;

const run = async() => {
  if (!argv.file) {
    DATA = await askJSON(SCHEMA, {}, INJECT_ANSWERS);
    process.stdout.write(JSON.stringify(DATA, null, 2));
    process.exit(0);
  } else {
    ensureFile(argv.file);
    const FILE = readJSON(argv.file);
    DATA = await askJSON(SCHEMA, FILE, INJECT_ANSWERS);
    writeJSON(argv.file, DATA);
  }
};

run();
