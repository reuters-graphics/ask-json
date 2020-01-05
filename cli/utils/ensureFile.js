const path = require('path');
const fs = require('fs');

module.exports = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(dirname, { recursive: true });
    fs.writeFileSync(filePath, '{}');
  };
};
