var childProcess = require('child_process');

function install(cb) {
  childProcess.spawn('bower', ['install', '--config.interactive=false'], {env: process.env, cwd: process.cwd(), stdio: 'inherit'})
    .on('exit', function () {
      childProcess.spawn('npm', ['install'], {env: process.env, cwd: process.cwd(), stdio: 'inherit'})
        .on('exit', function (err) {
          cb();
        });
    });
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  install: install
};
