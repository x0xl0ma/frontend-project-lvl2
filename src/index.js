import { has, union } from 'lodash';
import fs from 'fs';

const genDiff = (pathToFile1, pathToFile2) => {

    const getData1 = fs.readFileSync(pathToFile1, 'utf-8');
    const getData2 = fs.readFileSync(pathToFile2, 'utf-8');

    const obj1 = JSON.parse(getData1);
    const obj2 = JSON.parse(getData2);

    const keys = union(Object.keys(obj1), Object.keys(obj2)).sort();

    const result = keys.map((key) => {
        if (!has(obj2, key)) {
            return (` - ${key}: ${obj1[key]}\n`);
        }
        if (!has(obj1, key)) {
            return (` + ${key}: ${obj2[key]}\n`);
        }
        if (obj1[key] !== obj2[key]) {
            return(` - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}\n`);
        }
        else {
            return (`  ${key}: ${obj2[key]}`);
        }
    }).join('');
    
    return `{\n${result}\n}`;
};


export default genDiff;
