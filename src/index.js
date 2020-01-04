import { has, union } from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const parsing = (pathToFile) => {
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const fileType = path.extname(pathToFile);
  const obj = parse(data, fileType);
  return obj;
};

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

const makeSpace = (level) => '  '.repeat(level);

const stringify = (data, depth) => {
  if (!(data instanceof Object)) {
    return `${data}`;
  }
  const entries = Object.entries(data);
  return `{\n  ${entries.map(([key, value]) => `${makeSpace(depth + 2)}${key}: ${value}`).join('\n')}\n${makeSpace(depth + 1)}}`;
};
const getDataFromType = {
  removed: (node, depth) => {
    const { key, value } = node;
    return `${makeSpace(depth)}- ${key}: ${stringify(value, depth)}`;
  },
  added: (node, depth) => {
    const { key, value } = node;
    return `${makeSpace(depth)}+ ${key}: ${stringify(value, depth)}`;
  },
  changed: (node, depth) => {
    const { key, valueBefore, valueAfter } = node;
    return `${makeSpace(depth)}- ${key}: ${stringify(valueBefore, depth)}\n${makeSpace(depth)}+ ${key}: ${stringify(valueAfter, depth)}`;
  },
  unchanged: (node, depth) => {
    const { key, value } = node;
    return `${makeSpace(depth)}  ${key}: ${stringify(value, depth)}`;
  },
  nested: (node, depth, render) => {
    const { key, children } = node;
    return `${makeSpace(depth)}  ${key}: {\n${render(children, depth + 2)}\n${makeSpace(depth + 1)}}`;
  },
};

const render = (tree, depth = 1) => tree.map((node) => getDataFromType[node.type](node, depth, render)).join('\n');

const genDiff = (pathToFile1, pathToFile2) => {
  const object1 = parsing(pathToFile1);
  const object2 = parsing(pathToFile2);
  const ast = treeBuilder(object1, object2);
  const renderedAst = render(ast);
  return `{\n${renderedAst}\n}`;
};
export default genDiff;
