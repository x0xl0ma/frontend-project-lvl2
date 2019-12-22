import { has, union } from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const genDiff = (pathToFile1, pathToFile2) => {
  const data1 = fs.readFileSync(pathToFile1, 'utf-8');
  const data2 = fs.readFileSync(pathToFile2, 'utf-8');

  const type1 = path.extname(pathToFile1);
  const type2 = path.extname(pathToFile2);

  const obj1 = parse(data1, type1);
  const obj2 = parse(data2, type2);

  const keys = union(Object.keys(obj1), Object.keys(obj2)).sort();

  const result = keys.map((key) => {
    if (!has(obj2, key)) {
      return (` - ${key}: ${obj1[key]}`);
    }
    if (!has(obj1, key)) {
      return (` + ${key}: ${obj2[key]}`);
    }
    if (obj1[key] !== obj2[key]) {
      return (` - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`);
    }
    return (`   ${key}: ${obj2[key]}`);
  }).join('\n');
  return `{\n${result}\n}`;
};
export default genDiff;
