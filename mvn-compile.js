'use strict';

const shell = require('shelljs');

if (!shell.which('java')) {
  process.stderr.write('please install [java] first.');
}

if (!shell.which('mvn')) {
  process.stderr.write('please install [mvn] first.');
}

if (shell.exec(`export FORCE_COLOR='true'`).code !== 0) {
  process.stderr.write('export FORCE_COLOR >> execution failed.');
}

if (shell.exec('mvn clean').code !== 0) {
  process.stderr.write('mvn clean >> execution failed.');
}

if (shell.exec('mvn compile').code !== 0) {
  process.stderr.write('mvn compile >> execution failed.');
}
