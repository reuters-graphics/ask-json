import { name, version } from '../package.json';

import argv from 'yargs';
import path from 'path';
import run from './run';
import updateNotifier from 'update-notifier';

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
    }, run)
  .argv;
