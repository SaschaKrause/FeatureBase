'use strict';

var inquirer = require('inquirer')
  , childProcess = require('child_process');


/** Build
------------------------------------------------------------------------------*/
function run(cb) {
  inquirer.prompt([{
    type: 'confirm',
    name: 'runBuild',
    default: false,
    message: 'Would you like to run your build?'
  }, {
    type: 'list',
    name: 'nodeEnv',
    message: 'What NODE_ENV would you like to use?',
    choices: [
      'production',
      'staging',
      'qa',
      'developement',
      'custom'
    ],
    when: function (answers) {
      return answers.runBuild;
    }
  }, {
    type: 'input',
    name: 'customNodeEnv',
    message: 'Type the NODE_ENV you would like to use',
    when: function (answers) {
      return answers.nodeEnv === 'custom'
    }
  }], function (answers) {

    console.log();

    if (answers.runBuild) {
      runBuild(answers.nodeEnv !== 'custom' ? answers.nodeEnv : answers.customNodeEnv);
    } else {
      cb();
      process.exit(0);
    }
  });
}

function runBuild(nodeEnv) {
  process.chdir('./dist');
  process.env.NODE_ENV = nodeEnv;
  spawnProcess('node', ['server.js']);
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
  run: run
};
