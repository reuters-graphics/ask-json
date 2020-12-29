import ErrorHandler from './ErrorHandler';
import validateConfig from './utils/validateConfig';

// Need to capture process exit explicitly, as prompts
// handles this differently to escape each question...
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') process.exit(1);
});

export default async(schema, rawData, userConfig) => {
  const config = validateConfig(userConfig);

  const handler = new ErrorHandler(schema, rawData, config);

  await handler.handleErrors();
  if (config.askToAddItems) await handler.askToAddItems();

  return handler.data;
};
