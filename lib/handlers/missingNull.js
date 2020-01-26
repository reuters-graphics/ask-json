import prepareObjectPath from '../utils/prepareObjectPath';
import set from 'lodash/set';

export default (error, data) => {
  const { params, dataPath } = error;
  const updatePath = prepareObjectPath(dataPath, params.missingProperty);
  set(data, updatePath, null);
};
