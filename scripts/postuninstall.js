'use strict';

const utils = require('./lib/utils');

const shell = require('shelljs');

shell.cd('../../');

utils.remove('mvn-compile.js');

utils.newline();
