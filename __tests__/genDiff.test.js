import genDiff from '../src';
import { has, union } from 'lodash';
import fs from 'fs';
import path from 'path';

const fixuturesPath = path.join(__dirname, '__fixtures__');

describe("genDiff", () => {
    test("get the difference", () => {
        const pathToResult = path.join(__dirname, '/__fixtures__/result');
        const pathToFile1 = path.join(__dirname, '/__fixtures__/before.json');
        const pathToFile2 = path.join(__dirname, '/__fixtures__/after.json');
        const recevid = genDiff(pathToFile1, pathToFile2);
        const expected = fs.readFileSync(pathToResult, 'utf-8');
        expect(recevid).toBe(expected);
    })
});
