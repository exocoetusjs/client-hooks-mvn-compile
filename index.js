const fork = require('child_process').fork;

const path = require('path');

class MavenCompilePlugin {
  constructor({ cwd = '' } = {}) {
    this[Symbol.for('initProcess')]();
  }

  [Symbol.for('initProcess')]() {
    const modulePath = path.join(moduleDir, 'mvn-compile.js');

    this[Symbol.for('process')] = fork(modulePath);
  }

  getProcess() {
    return this[Symbol.for('process')];
  }
};

module.exports = MavenCompilePlugin;
