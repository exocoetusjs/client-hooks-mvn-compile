const fork = require('child_process').fork;

const path = require('path');

class MavenCompilePlugin {
  constructor({ cwd = '' } = {}) {
    this[Symbol.for('initProcess')]();
  }

  getProcess() {
    return this[Symbol.for('process')];
  }

  [Symbol.for('initProcess')]() {
    const modulePath = path.join(__dirname, 'mvn-compile.js');

    this[Symbol.for('process')] = fork(modulePath, [], { silent: true });
  }
};

module.exports = MavenCompilePlugin;
