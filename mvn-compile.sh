#!/bin/node

'use strict';

const shell = require('shelljs');

try {
  shell.config.fatal = true;

  if (!shell.which('java')) {
    process.stderr.write('please install [java] first\n');
  }

  if (!shell.which('mvn')) {
    process.stderr.write('please install [mvn] first\n');
  }

  shell.exec('mvn clean');

  shell.exec('mvn compile');
}
catch (error) {
  process.stderr.write(`${error}\n`);
}
