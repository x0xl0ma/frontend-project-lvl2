
import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test.each([
  ['json'],
  ['yml'],
  ['ini'],
])('get the Diffirence. s%', (format) => {
  const pathToFile1 = `${__dirname}/__fixtures__/before.${format}`;
  const pathToFile2 = `${__dirname}/__fixtures__/after.${format}`;
  const pathToResult = path.join(__dirname, '/__fixtures__/result');
  const expected = fs.readFileSync(pathToResult, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(expected);
});
