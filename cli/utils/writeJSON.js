import fs from 'fs';

export default (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
