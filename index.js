const spawn = require('child_process').spawn;

class MavenCompilePlugin {
  constructor({ pluginName = '', cwd = '' }) {
    this[Symbol.for('pluginName')] = pluginName;
    this[Symbol.for('childProcess')] = spawn('node', './mvn-compile.js');
  }

  getPluginName() {
    return this[Symbol.for('pluginName')];
  }

  getChildProcess() {
    return this[Symbol.for('childProcess')];
  }
};

module.exports = MavenCompilePlugin;
