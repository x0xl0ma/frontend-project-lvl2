#!/usr/bin/env node

import program from 'commander';

program
  .version('1.0.0','-V, --version', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstPath, secondPath) => {
    concole.log(genDiff(firstPath, secondPath));
})
.parse(process.argv);
