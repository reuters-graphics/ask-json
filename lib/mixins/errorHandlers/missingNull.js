import prepareObjectPath from '../../utils/prepareObjectPath';
import set from 'lodash/set';

export default {
  handleMissingNull(error) {
    const { params, dataPath } = error;
    const updatePath = prepareObjectPath(dataPath, params.missingProperty);
    set(this.data, updatePath, null);
  },
};
