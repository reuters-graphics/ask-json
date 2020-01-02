const removeLeadingAndTrailingDot = (string) =>
  string.replace(/^\.+/, '').replace(/\.+$/, '');

module.exports = (dataPath, property = '') =>
  removeLeadingAndTrailingDot(`${dataPath}.${property}`);
