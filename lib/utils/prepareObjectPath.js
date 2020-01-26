const removeLeadingAndTrailingDot = (string) =>
  string.replace(/^\.+/, '').replace(/\.+$/, '');

export default (dataPath, property = '') =>
  removeLeadingAndTrailingDot(`${dataPath}.${property}`);
