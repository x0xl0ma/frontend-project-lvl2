
import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const formats = {
  json: 'json',
  yaml: 'yml',
  ini: 'ini',
};

const getFormat = (type) => formats[type];

const fixuturesPath = path.join(__dirname, '__fixtures__');

test.each([
  ['before', 'after', 'json'],
  ['before', 'after', 'yaml'],
  ['before', 'after', 'ini'],
])('get the Diffirence. s%', () => {
  const pathToFile1 = path.join(fixuturesPath, `before.${getFormat}`);
  const pathToFile2 = path.join(fixuturesPath, `after.${getFormat}`);
  const pathToResult = path.join(__dirname, '/__fixtures__/result');
  const expected = fs.readFileSync(pathToResult, 'utf-8');
  expected(genDiff(pathToFile1, pathToFile2)).toEqual(expected);
});

