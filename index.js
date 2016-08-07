const spawn = require('child_process').spawn;

const path = require('path');

class MavenCompilePlugin {
  constructor({ cwd = '' } = {}) {
    this[Symbol.for('initProcess')]();
  }

  [Symbol.for('initProcess')]() {
    const moduleDir = __dirname;

    const scriptPath = path.join(moduleDir, 'mvn-compile.js');

    this[Symbol.for('process')] = spawn('node', [scriptPath]);
  }

  getProcess() {
    return this[Symbol.for('process')];
  }
};

module.exports = MavenCompilePlugin;
