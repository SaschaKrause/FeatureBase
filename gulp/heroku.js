'use strict';

var async = require('async')
  , gutil = require('gulp-util')
  , inquirer = require('inquirer')
  , childProcess = require('child_process')
  , shellscript = require('shellscript');


/** Deploy
------------------------------------------------------------------------------*/
function deploy(mainCb) {

  console.log(green('\n✔ Build Success\n'));

  // pull the last commit message from the main repo
  var lastCommitHash = shellscript.$('command git log -1 --pretty=%h');
  var lastCommitMessage = shellscript.$('command git log -1 --pretty=%B');

  //turn it into a commit message that we can use on the Heroku repo
  var defaultCommit = '';
  lastCommitHash && ( defaultCommit += lastCommitHash.match(/[^$\n+]+/)[0] + ' ');
  lastCommitMessage && (defaultCommit += '(' + lastCommitMessage.match(/[^$\n+]+/)[0] + ') ');

  // ask questions
  inquirer.prompt([{
    type: 'input',
    name: 'commitMessage',
    message: 'Write a commit message: ' + defaultCommit,
    filter: function (input) {
      return defaultCommit + input;
    }
  },{
    type: 'confirm',
    name: 'wantsLogs',
    message: 'Do you wanna see the logs?'
  }], function (answers) {

      console.log();

      process.chdir('./dist');

      async.series([
        function (cb) {
          spawnProcess('git', ['add', '-A', '.'], cb);
        },
        function (cb) {
          spawnProcess('git', ['commit', '-m', answers.commitMessage], function () {
            cb(); // always call this without error
          });
        },
        function (cb) {
          spawnProcess('git', ['push', 'heroku', 'master'], cb);
        },
        function (cb) {
          if (answers.wantsLogs) {
            spawnProcess('heroku', ['logs', '-t']);
          } else {
            cb();
          }
        }
      ], function (err) {
        if (err) {
          console.log(red('\n✖ Deploy Failed'));
          process.exit(1);
        } else {
          console.log();
          mainCb();
          console.log(green('\n✔ Deploy Success'));
          process.exit(0);
        }
      });
  });
}


/** Utility functions
------------------------------------------------------------------------------*/
function spawnProcess(cmd, args, exitCallback) {
  childProcess.spawn(cmd, args, {env: process.env, cwd: process.cwd(), stdio:'inherit'})
    .on('exit', exitCallback || function () {});
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  deploy: deploy
};
