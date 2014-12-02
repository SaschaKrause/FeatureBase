'use strict';

var _ = require('lodash')
  , gutil = require('gulp-util')
  , async = require('async')
  , childProcess = require('child_process')
  , inquirer = require('inquirer');

/** Vars
------------------------------------------------------------------------------*/
var localRoot = 'client/assets/i18n/';


/** Pull from server
------------------------------------------------------------------------------*/
var pull = {
  type: 'confirm',
  name: 'pull',
  message: 'Do you want to pull the latest PhraseApp content first?',
  default: true
};
var pullWhich = {
  type: 'checkbox',
  name: 'pullWhich',
  when: function (answers) {
    return answers.pull || answers.pull === undefined;
  },
  message: 'Which content would you like to pull?',
  choices: [
    {name: 'common', checked: true},
    {name: 'invariants', checked: true},
    {name: 'exercises', checked: true}
  ]
};

function phrase(callback, questions) {
  async.waterfall([
    function (cb) {
      inquirer.prompt(questions || [pullWhich], function (answers) {
        if (answers.pull === false) return callback();
        var pull = {
          common: _.contains(answers.pullWhich, 'common'),
          exercises: _.contains(answers.pullWhich, 'exercises'),
          invariants: _.contains(answers.pullWhich, 'invariants')
        };
        if (!_.any(pullWhich)) {
          console.log(gutil.colors.magenta('\nEr...then...what you doing?!\n'));
        }
        cb(null, pull);
      });
    },
    // check they have phrase command
    function (pull, cb) {
      spawnSilentProcess('phrase', [], function (err) {
        cb(null, pull, err === 0);
      });
    },
    // if not try and install it
    function (pull, hasPhrase, cb) {
      if (hasPhrase) return cb(null, pull);

      console.log('\nYou do not have the command line tool for PhraseApp. Attemting to install...');
      spawnProcess('gem', ['install', 'phrase'], function (err) {
        if (err !== 0) return cb('\nYou do not have the command line tool for PhraseApp installed and we cannot install it for some reason, try `gem install phrase`. Or check http://phraseapp.com for more info');
        // attempt reload shell
        console.log(gutil.colors.magenta('\nIf the process ends here then you need to restart your shell before continuing, try'), gutil.colors.green('`exec $SHELL`\n'));
        spawnProcess('exec', ['$SHELL'], function () {
          cb(null, pull);
        })
      });
    },
    // now do the phrase commands
    function (pull, cb) {
      if (pull.common) {
        spawnProcess('phrase', ['init', '--default-target='+localRoot, '--secret=8a1226c68ce87cbabbfdb6279c29d49b', '--default-locale=en-GB'], function (err) {
          spawnProcess('phrase', ['pull', '--format=simple_json'], function () {
            cb(null, pull);
          })
        });
      }
      else cb(null, pull);
    },
    function (pull, cb) {
      if (pull.invariants) {
        spawnProcess('phrase', ['init', '--default-target='+localRoot+'phrase_invars/', '--secret=e58aeca0cac2fc906670c798b4cc344f', '--default-locale=de-DE', '--locale-filename=phrase_invars-<locale.name>.json'], function (err) {
          spawnProcess('phrase', ['pull', '--format=nested_json'], function () {
            cb(null, pull);
          })
        });
      }
      else cb(null, pull);
    },
    function (pull, cb) {
      if (pull.exercises) {
        spawnProcess('phrase', ['init', '--default-target='+localRoot+'exercises/', '--secret=9f84c7e4a9a51017a92c9a413e283ac1', '--default-locale=de-DE', '--locale-filename=exercises-<locale.name>.json'], function (err) {
          spawnProcess('phrase', ['pull', '--format=nested_json'], function () {
            cb();
          })
        });
      }
      else cb();
    }
    // final handler
  ],function (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    callback();
  });
}
phrase.confirmFirst = function (callback) {
  return phrase(callback, [pull, pullWhich]);
}


/** Utility functions
------------------------------------------------------------------------------*/
function spawnProcess(cmd, args, exitCallback) {
  childProcess.spawn(cmd, args, {env: process.env, cwd: process.cwd(), stdio:'inherit'})
    .on('exit', exitCallback || function () {})
    .on('error', exitCallback || function () {});
}
function spawnSilentProcess(cmd, args, exitCallback) {
  childProcess.spawn(cmd, args, {env: process.env, cwd: process.cwd()})
    .on('exit', exitCallback || function () {})
    .on('error', exitCallback || function () {});
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = phrase;
