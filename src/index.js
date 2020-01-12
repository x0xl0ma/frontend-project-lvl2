import fs from 'fs';
import path from 'path';
import parse from './parsers';
import rendering from './formatters';
import treeBuilder from './treeBuilder';

const genDiff = (pathToFile1, pathToFile2, format) => {
  const data1 = fs.readFileSync(pathToFile1, 'utf-8');
  const data2 = fs.readFileSync(pathToFile2, 'utf-8');

  const fileType1 = path.extname(pathToFile1).slice(1);
  const fileType2 = path.extname(pathToFile2).slice(1);

  const object1 = parse(data1, fileType1);
  const object2 = parse(data2, fileType2);

  const ast = treeBuilder(object1, object2);

  const result = rendering(ast, format);

  return result;
};
export default genDiff;
