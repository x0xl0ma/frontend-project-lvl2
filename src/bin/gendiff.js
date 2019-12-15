#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('1.0.0','-V, --version', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((pathToFile1, pathToFile2) => {
    console.log(genDiff(pathToFile1, pathToFile2));
})
.parse(process.argv);
