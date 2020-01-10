
import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test.each([
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
])('get the Diffirence. s% formatter s%', (format, formatter) => {
  const pathToFile1 = `${__dirname}/__fixtures__/before.${format}`;
  const pathToFile2 = `${__dirname}/__fixtures__/after.${format}`;
  const pathToResult = path.join(__dirname, '/__fixtures__/plain');
  const expected = fs.readFileSync(pathToResult, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2, formatter)).toEqual(expected);
});

test.each([
  ['json', 'tree'],
  ['ini', 'tree'],
  ['yml', 'tree'],
])('get the Diffirence. s% formatter s%', (format, formatter) => {
  const pathToFile1 = `${__dirname}/__fixtures__/before.${format}`;
  const pathToFile2 = `${__dirname}/__fixtures__/after.${format}`;
  const pathToResult = path.join(__dirname, '/__fixtures__/tree');
  const expected = fs.readFileSync(pathToResult, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2, formatter)).toEqual(expected);
});

test.each([
  ['json', 'json'],
  ['ini', 'json'],
  ['yml', 'json'],
])('get the Diffirence. s% formatter s%', (format, formatter) => {
  const pathToFile1 = `${__dirname}/__fixtures__/before.${format}`;
  const pathToFile2 = `${__dirname}/__fixtures__/after.${format}`;
  const pathToResult = path.join(__dirname, '/__fixtures__/json');
  const expected = fs.readFileSync(pathToResult, 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2, formatter)).toEqual(expected);
});
