import askJSON from 'ask-json';
import chalk from 'chalk';
import ensureFile from './utils/ensureFile';
import fs from 'fs';
import readJSON from './utils/readJSON';
import writeJSON from './utils/writeJSON';

export default async(args) => {
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
