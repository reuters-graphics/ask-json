import fs from 'fs';

class InvalidJSONError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default filePath => {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (e) {
    throw new InvalidJSONError(e.toString());
  }
};
