import { has, union } from 'lodash';

const treeBuilder = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2)).sort();

  const tree = keys.map((key) => {
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      return {
        key,
        type: 'nested',
        children: treeBuilder(obj1[key], obj2[key]),
      };
    }
    if (!has(obj2, key) && has(obj1, key)) {
      return {
        key,
        type: 'removed',
        value: obj1[key],
      };
    }
    if (!has(obj1, key) && has(obj2, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'changed',
        valueBefore: obj1[key],
        valueAfter: obj2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: obj1[key],
    };
  });
  return tree;
};

export default treeBuilder;
