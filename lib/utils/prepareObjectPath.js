export default (dataPath, property = '') =>
  `${dataPath}.${property}`
    .replace(/^\.+/, '') // Remove leading...
    .replace(/\.+$/, ''); // and trailing dots.
