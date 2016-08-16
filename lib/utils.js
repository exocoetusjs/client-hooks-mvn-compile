'use strict';

const spawn = require('child_process').spawn;

const shell = require('shelljs');

const chalk = require('chalk');

const path = require('path');

// need shell.cd('../..') first.
function get_config_path() {
  const pwd = shell.pwd().toString();

  const config_path = path.join(pwd, '.clienthooks');

  return config_path;
}

function get_mvn_compile_config_path() {
  const config_path = get_config_path();

  const mvn_compile_config_path = path.join(config_path, 'mvn_compile.js');

  return mvn_compile_config_path;
}

function get_config() {
  const config_path = get_mvn_compile_config_path();

  let config;

  try {
    config = require(config_path);
  }
  catch (error) {
    const message = `${config_path} >> don't exist.`;

    const error = new ConfiguarationDontExistError();

    throw error;
  }

  return config;
}

function mvn(params = []) {
  const result = new Promise((resolve, reject) => {
    const instance = spawn('mvn', params);

    instance.on('close', resolve);

    instance.stdout.on('data', color);

    instance.stderr.on('data', color);
  });
  return result;
}

function color(buffer) {
  const text = buffer.toString();

  outputWithColor(text);
}

function outputWithColor(line = '') {
  if (line.match(/Tests run: ([^,]*)/)) {
    return process.stdout.write(chalk.bold.green(line));
  }

  if (line.match(/Failures: ([^,]*)/)) {
    return process.stdout.write(chalk.bold.red(line));
  }

  if (line.match(/Error: ([^,]*)/)) {
    return process.stdout.write(chalk.bold.yellow(line));
  }

  if (line.match(/Skipped: ([^,]*)/)) {
    return process.stdout.write(chalk.bold.blue(line));
  }

  if (line.match(/(\[{0.1}WARN(ING){0, 1})\]{0, 1}.*/)) {
    return process.stdout.write(chalk.bold.yellow(line));
  }

  if (line.match(/(\[ERROR\].*)/)) {
    return process.stdout.write(chalk.bold.red(line));
  }

  if (line.match(/(BUILD ){0, 1} SUCCESS.*/)) {
    return process.stdout.write(chalk.bold.green(line));
  }

  if (line.match(/(BUILD ){0, 1} FAILURE.*/)) {
    return process.stdout.write(chalk.bold.green(line));
  }

  if (line.match(/(\[INFO\]\ \-.*)/)) {
    return process.stdout.write(chalk.blue.bold(line));
  }

  if (line.match(/(\[INFO\]\ [^-].*)/)) {
    return process.stdout.write(chalk.bold(line));
  }

  process.stdout.write(line);
}

class ConfiguarationDontExistError extends Error {
  constructor(reason = '') {
    super(reason);
  }
}

module.exports = {
  mvn: mvn,
  get_config: get_config,
};
