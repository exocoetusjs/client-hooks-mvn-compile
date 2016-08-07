'use strict';

const shell = require('shelljs');

if (!shell.which('java')) {
  process.stderr.write('please install [java] first.\n');
}

if (!shell.which('mvn')) {
  process.stderr.write('please install [mvn] first.\n');
}

if (shell.exec(`export FORCE_COLOR='true'`).code !== 0) {
  process.stderr.write('export FORCE_COLOR >> execution failed.\n');
}

if (shell.exec('mvn clean').code !== 0) {
  process.stderr.write('mvn clean >> execution failed.\n');
}

if (shell.exec('mvn compile').code !== 0) {
  process.stderr.write('mvn compile >> execution failed.\n');
}
