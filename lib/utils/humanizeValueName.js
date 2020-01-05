const chalk = require('chalk');

module.exports = (updatePath) => {
  // Either the last property value or property value and array(s) index
  // author.name => name
  // author.emails[0] => emails[0]
  // authors.emails[0][0] => emails[0][0]
  const fieldName = /\[\d+\]$/.test(updatePath) ?
    updatePath.match(/[^.]+$/)[0] :
    updatePath.match(/[^.[\]]+$/)[0];

  if (fieldName === updatePath) return `${chalk.underline.green(fieldName)}`;

  const location = updatePath.replace(fieldName, '').replace(/\.$/, '');

  return `${chalk.underline.green(fieldName)} ${chalk.grey(`(${location})`)}`;
};
