const spawn = require('child_process').spawn;

class MavenCompilePlugin {
  constructor({ cwd = '' }) {
    this[Symbol.for('pluginName')] = 'mvn-compile';
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
