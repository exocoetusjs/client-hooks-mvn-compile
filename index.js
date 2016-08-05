const spawn = require('child_process').spawn;

class MavenCompilePlugin {
  constructor({ cwd = '' } = {}) {
    this[Symbol.for('pluginName')] = 'mvn-compile';
  }

  getPluginName() {
    return this[Symbol.for('pluginName')];
  }

  getProcess() {
    let childProcess = this[Symbol.for('childProcess')];

    if (!childProcess) {
      this[Symbol.for('childProcess')] = spawn('node', ['./mvn-compile.js']);
    }
    return this[Symbol.for('childProcess')];
  }
};

module.exports = MavenCompilePlugin;
