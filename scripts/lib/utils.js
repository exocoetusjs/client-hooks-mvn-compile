'use strict';

const addr = require('../config/addr');

const inquirer = require('inquirer');

const download = require('download');

const shell = require('shelljs');

const chalk = require('chalk');

const path = require('path');

const fs = require('fs');

const co = require('co');

function newline() {
  process.stdout.write('\n');
}

function copy(filename = '') {
  const result = co(function*() {
    if (filename === 'mvn-compile.js') {
      return copy_mvn_compile_config();
    }
  });
  return result;
}

function check(filename = '') {
  if (filename === 'mvn-compile.js') {
    check_mvn_compile_config_dir();
  }
}

function remove(filename = '') {
  if (filename === 'mvn-compile.js') {
    remove_mvn_compile_config();
  }
}

function get_plugin() {
  return "mvn-compile.js";
}

function get_config_dir() {
  const pwd = shell.pwd().toString();

  const plugin = get_plugin();

  const config_dir = path.join(pwd, '.clienthooks');

  return config_dir;
}

function get_mvn_compile_config_dir() {
  const config_dir = get_config_dir();

  const plugin = get_plugin();

  const filePath = path.join(config_dir, plugin);

  return filePath;
}

function check_mvn_compile_config_dir() {
  const config_dir = get_config_dir();

  const dir = chalk.bgBlack(config_dir);

  const error = chalk.red('ERR!');

  if (!shell.test('-d', config_dir)) {
    const message = `${error} \`${dir}\` don't exist.\n\n`;

    process.stderr.write(message);

    process.exit(1);
  }
}

function logger_operate(operate = '', filepath = '') {
  const colon = chalk.bold.blue('::');

  const oper = chalk.bold(operate);

  const file = chalk.bgBlack(filepath);

  console.log(`${colon} ${oper} ${file} ...`);
}

function get_user_answers(filePath = '') {
  let answers = 'keep';

  if (shell.test('-f', `${filePath}`)) {
    answers = inquirer.prompt([{
      type: 'list',
      name: 'deal exist file',
      choices: ['remove', 'backup', 'keep'],
      message: `${filePath} already exist, what you want to do?`,
    }])
  }
  return Promise.resolve(answers);
}

function deal_exist_file(filePath= '') {
  const result = co(function *() {
    const bakPath = `${filePath}.bak`;

    let answers = yield get_user_answers(filePath);

    answers = answers['deal exist file'];

    if (answers === 'remove') {
      return shell.rm(`${filePath}`);
    } else if (answers === 'backup') {
      return shell.mv(`${filePath}`, `${bakPath}`);
    } else if (answers === 'keep') {
      return 'keep';
    }
  });
  return result;
}

function copy_mvn_compile_config() {
  const result = co(function *() {
    const filePath = get_mvn_compile_config_dir();

    const filename = path.basename(filePath);

    const url = addr[filename];

    const result = yield deal_exist_file(filePath);

    if (result !== 'keep') {
      logger_operate('copy', `${filePath}`);

      const file =  yield download(url);

      fs.writeFileSync(`${filePath}`, file);
    }
  });
  return result;
}

function remove_mvn_compile_config() {
  const filePath = get_mvn_compile_config_dir();

  logger_operate('remove', `${filePath}`);

  if (shell.test('-f', `${filePath}`)) {
    shell.rm(`${filePath}`);
  }
}

module.exports = {
  copy: copy,
  check: check,
  remove: remove,
  newline: newline,
};
