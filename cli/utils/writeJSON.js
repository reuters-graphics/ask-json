const fs = require('fs');

module.exports = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
