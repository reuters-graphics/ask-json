const ordinal = require('ordinal');
const chalk = require('chalk');

module.exports = (updatePath) => {
  // Match array paths like: authors[0].email
  const arrayPathMatches = updatePath.match(/[^.[\]]+\[\d+\]\.[^.[\]]+$/);

  if (arrayPathMatches) {
    const arrayPath = arrayPathMatches[0];
    // Strip out field name: authors[0].email => authors
    const arrayField = arrayPath.replace(arrayPath.match(/\[\d+\].+$/), '');
    // Strip and parse to ordinal item number: authors[0].email => 1st
    const itemNumber = ordinal(parseInt(arrayPath.match(/\[(?<digit>\d+)\]/).groups.digit) + 1);
    return ` for the ${chalk.yellow(itemNumber)} item in ${chalk.green(arrayField)}`;
  }
  return '';
};
