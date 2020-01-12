import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const consOfPath = (fileName) => path.join(__dirname, `/__fixtures__/${fileName}`);

test.each([
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
])('get the Diffirence. s% formatter s%', (format, formatter) => {
  const pathToFile1 = consOfPath(`before.${format}`);
  const pathToFile2 = consOfPath(`after.${format}`);
  const pathToResult = path.join(__dirname, '/__fixtures__/plain');
  const expected = fs.readFileSync(pathToResult, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2, formatter)).toEqual(expected);
});

test.each([
  ['json', 'tree'],
  ['ini', 'tree'],
  ['yml', 'tree'],
])('get the Diffirence. s% formatter s%', (format, formatter) => {
  const pathToFile1 = consOfPath(`before.${format}`);
  const pathToFile2 = consOfPath(`after.${format}`);
  const pathToResult = path.join(__dirname, '/__fixtures__/tree');
  const expected = fs.readFileSync(pathToResult, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2, formatter)).toEqual(expected);
});

test.each([
  ['json', 'json'],
  ['ini', 'json'],
  ['yml', 'json'],
])('get the Diffirence. s% formatter s%', (format, formatter) => {
  const pathToFile1 = consOfPath(`before.${format}`);
  const pathToFile2 = consOfPath(`after.${format}`);
  const pathToResult = path.join(__dirname, '/__fixtures__/json');
  const expected = fs.readFileSync(pathToResult, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2, formatter)).toEqual(expected);
});
