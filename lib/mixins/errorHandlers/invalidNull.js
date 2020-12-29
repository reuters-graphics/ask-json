import prepareObjectPath from '../../utils/prepareObjectPath';
import set from 'lodash/set';

export default {
  async handleInvalidNull(error) {
    const { dataPath } = error;
    const updatePath = prepareObjectPath(dataPath);

    set(this.data, updatePath, null);
  },
};
