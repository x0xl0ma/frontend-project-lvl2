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

const makeSpase = (level) => '  '.repeat(level);

const stringify = (data, depth) => {
  const firstSpase = makeSpase(depth + 2);
  const lastSpase = makeSpase(depth + 1);
  
  if(!(data instanceof Object)) {
    return data;
  }
  if (data instanceof Object) {
    const entries = Object.entries(data);
    return `{\n${entries.map(([key, value]) => `${firstSpase}  ${key}: ${value}`).join('\n')}\n${lastSpase}}`;
  }
};

const getDataFromType = {
  removed: (node) => `${makeSpase(1)}- ${node.key}: ${stringify(node.value)}${makeSpase(1)}`,
  added: (node) => `${makeSpase(1)}+ ${node.key}: ${stringify(node.value)}${makeSpase(1)}`,
  changed: (node) => `${makeSpase(1)}- ${node.key}: ${stringify(node.valueBefore)}\n${makeSpase(1)}+ ${node.key}: ${stringify(node.valueAfter)}${makeSpase(1)}`,
  unchanged: (node) => `${makeSpase(1)}  ${node.key}: ${stringify(node.value)}${makeSpase(1)}`,
  nested: (node) => `${makeSpase(1)}${node.key}: {\n${mapping(node.children)}${makeSpase(1)} \n}`,
};

const mapping = (tree) => tree.map((node) => getDataFromType[node.type](node)).join('\n');

const genDiff = (pathToFile1, pathToFile2) => {
  const object1 = parsing(pathToFile1);
  const object2 = parsing(pathToFile2);
  const ast = treeBuilder(object1, object2);
  const mappedAst = mapping(ast);
  return mappedAst;
};
export default genDiff;
