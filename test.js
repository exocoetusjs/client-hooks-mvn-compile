const Plugin = require('./index.js');

let plugin = new Plugin();

setTimeout(function() {
  plugin.getChildProcess()
  .stdout.on('data', (data) => {
    console.log(data.toString());
  });
}, 1000);
