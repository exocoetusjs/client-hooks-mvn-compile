'use strict';

const utils = require('./utils');

const config = utils.get_config();

const shell = require('shelljs');

const chalk = require('chalk');

const co = require('co');

co(function *() {
  process.env.FORCE_COLOR = 'true';

  if (!shell.which('java')) {
    process.stderr.write('please install [java] first.');
  }

  if (!shell.which('mvn')) {
    process.stderr.write('please install [mvn] first.');
  }

  let clean = yield utils.mvn(['clean']);

  if (clean !== 0) {
    process.stderr.write('mvn clean >> execution failed.');
  }

  let compile = yield utils.mvn(['compile']);

  if (compile !== 0) {
    process.stderr.write('mvn compile >> execution failed.');
  }
});
