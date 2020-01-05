const fs = require('fs');

module.exports = filePath => JSON.parse(fs.readFileSync(filePath));
