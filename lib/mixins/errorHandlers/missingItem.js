import get from 'lodash/get';
import prepareObjectPath from '../../utils/prepareObjectPath';
import set from 'lodash/set';

const pushToPath = (data, updatePath, item = null) => {
  const arr = get(data, updatePath);
  arr.push(item);
  set(data, updatePath, arr);
};

export default {
  handleMissingItem(error) {
    const { parentSchema, dataPath } = error;
    const updatePath = prepareObjectPath(dataPath);

    if (parentSchema.items.type === 'object') {
      pushToPath(this.data, updatePath, {});
    }
    if (parentSchema.items.type === 'array') {
      pushToPath(this.data, updatePath, []);
    }
    if (
      parentSchema.items.type === 'number' ||
        parentSchema.items.type === 'integer' ||
        parentSchema.items.type === 'string' ||
        parentSchema.items.type === 'boolean' ||
        parentSchema.items.type === 'null'
    ) {
      pushToPath(this.data, updatePath, null);
    }
  },
};
