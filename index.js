const spawn = require('child_process').spawn;

const path = require('path');

class MavenCompilePlugin {
  constructor({ cwd = '' } = {}) {
    this[Symbol.for('pluginName')] = 'mvn-compile';
    this[Symbol.for('initProcess')]();
  }

  [Symbol.for('initProcess')]() {
    const moduleDir = __dirname;
    const scriptLocation = path.join(moduleDir, 'mvn-compile.js');

    this[Symbol.for('process')] = spawn('node', scriptLocation);
  }

  getProcess() {
    return this[Symbol.for('process')];
  }

  getPluginName() {
    return this[Symbol.for('pluginName')];
  }
};

module.exports = MavenCompilePlugin;
