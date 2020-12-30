import ErrorHandler from './ErrorHandler';
import chalk from 'chalk';
import validateConfig from './utils/validateConfig';

// Need to capture process exit explicitly, as prompts
// handles this differently to escape each question...
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') process.exit(1);
});

const TESTING = Boolean(process.env.TEST);

export default async(schema, rawData, userConfig) => {
  if (!TESTING) console.log(chalk`\n\{{cyan ?}\} AskJSON\n`);

  const config = validateConfig(userConfig);

  const handler = new ErrorHandler(schema, rawData, config);

  await handler.handleErrors();
  if (config.askToAddItems) await handler.askToAddItems();

  if (!TESTING) console.log(chalk`\n\{{cyan ?}\} {green ✓ validated}\n`);

  return handler.data;
};
