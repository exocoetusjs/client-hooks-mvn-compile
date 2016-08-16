'use strict';

const utils = require('./lib/utils');

const shell = require('shelljs');

const co = require('co');

shell.config.silent = true;

co(function *() {
  shell.cd('../../');

  // check logic
  utils.check('mvn-compile.js');

  // copy logic
  yield utils.copy('mvn-compile.js');

  // newline logic
  utils.newline();
});
