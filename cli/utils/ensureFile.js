import fs from 'fs';
import path from 'path';

export default (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(dirname, { recursive: true });
    fs.writeFileSync(filePath, '{}');
  };
};
