import prepareObjectPath from '../utils/prepareObjectPath';
import set from 'lodash/set';

export default async(error, data, injectAnswers) => {
  const { dataPath } = error;
  const updatePath = prepareObjectPath(dataPath);

  set(data, updatePath, null);
};
