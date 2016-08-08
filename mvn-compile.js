'use strict';

const shell = require('shelljs');

const chalk = require('chalk');

process.env.FORCE_COLOR = 'true';

if (!shell.which('java')) {
  process.stderr.write('please install [java] first.');
}

if (!shell.which('mvn')) {
  process.stderr.write('please install [mvn] first.');
}

if (shell.exec('mvn clean').code !== 0) {
  process.stderr.write('mvn clean >> execution failed.');
}

if (shell.exec('mvn compile').code !== 0) {
  process.stderr.write('mvn compile >> execution failed.');
}
