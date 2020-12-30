import { name, version } from '../package.json';

import argv from 'yargs';
import askJSON from 'ask-json';
import chalk from 'chalk';
import ensureFile from './utils/ensureFile';
import fs from 'fs';
import path from 'path';
import readJSON from './utils/readJSON';
import updateNotifier from 'update-notifier';
import writeJSON from './utils/writeJSON';

updateNotifier({ pkg: { name, version } }).notify();

argv // eslint-disable-line no-unused-expressions
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
            describe: 'Path to a JSON file to validate. Per the JSON schema, users will be asked to supply missing and correct invalid data. Their answers will be written back to the file unless an output file is specified.',
            type: 'string',
            coerce: (filePath) => !filePath ? false : path.resolve(process.cwd(), filePath),
          },
          output: {
            alias: 'o',
            describe: 'Path to a JSON file to output valid data to.',
            type: 'string',
            coerce: (filePath) => !filePath ? false : path.resolve(process.cwd(), filePath),
          },
        })
        .help()
        .version();
    }, async function(args) {
      await runCLI(args);
    })
  .argv;

const runCLI = async(args) => {
  if (!fs.existsSync(args.schema)) {
    console.error(`\n⛔ Unable to read JSON schema file: ${chalk.green(args.schema)}\n`);
    process.exit(1);
  }

  const SCHEMA = readJSON(args.schema);
  let VALID_DATA;

  if (!args.file) {
    VALID_DATA = await askJSON(SCHEMA, {});
  } else {
    ensureFile(args.file);
    const RAW_DATA = readJSON(args.RAW_DATA);
    VALID_DATA = await askJSON(SCHEMA, RAW_DATA);
  }
  if (args.output) {
    ensureFile(args.output);
    writeJSON(args.output, VALID_DATA);
  } else if (args.file) {
    writeJSON(args.file, VALID_DATA);
  } else {
    process.stdout.write(JSON.stringify(VALID_DATA, null, 2));
    process.exit(0);
  }
};
