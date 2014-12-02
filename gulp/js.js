'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , uglify = require('gulp-uglifyjs')
  , jshint = require('gulp-jshint')
  , cached = require('gulp-cached')
  , stylish = require('jshint-stylish')
  , ngAnnotate = require('gulp-ng-annotate')
  , childProcess = require('child_process')
  , reload = require('browser-sync').reload;


////////////////////////////////////////////////////////////////////////////////
/// TODO                                                                      //
/// 1. add jshint options in here, mash them together using lodash for        //
///    different options depending on browser/node and serve/build            //
////////////////////////////////////////////////////////////////////////////////


/** Gulpfile
------------------------------------------------------------------------------*/
function gulpServe() {
  return gulp.src(GULP_FILES)
    .pipe(jshint('server/.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', err);
}

function gulpBuild() {
  return gulp.src(['gulpfile.js', 'chunks/**/*'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', buildErr);
}

function gulpChanged() {
  gutil.beep();
  // console.log(gutil.colors.red('\n---------------------------\nRestarting the Gulp process\n---------------------------\n'));
  console.log(gutil.colors.red('\n------------------------\nRestart the Gulp process\n------------------------\n'));
  // spawnProcess('gulp').on('SIGINT', function () {
    // catch exit message, to kill parent but kill child alive
  // });
  // process.exit(0);
}


/** Client
------------------------------------------------------------------------------*/
function clientServe(glob) {
  return function () {
    return gulp.src(glob)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail').on('error', err))
      .pipe(cached('js:client'))
      .pipe(reload({stream: true}))
  }
}

function clientBuild(glob, output) {
  return function() {
    return gulp.src(glob)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail'))
      .on('error', buildErr)
      .pipe(gulp.dest('dist/public'))
      .pipe(ngAnnotate())
      .pipe(uglify('pixformance.min.js'))
      .pipe(gulp.dest(output));
  }
}


/** Node
------------------------------------------------------------------------------*/
function serverServe(glob) {
  return function () {
    return gulp.src(glob)
      .pipe(jshint('./server/.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail'))
      .on('error', err);
  }
}

function serverBuild(glob, output) {
  return function () {
    return gulp.src(glob)
      .pipe(jshint('./server/.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail'))
      .on('error', buildErr)
      .pipe(gulp.dest(output))
  }
}


/** Utility functions
------------------------------------------------------------------------------*/
function spawnProcess(cmd, args, exitCallback) {
  return childProcess.spawn(cmd, args || [], {env: process.env, cwd: process.cwd(), stdio:'inherit'})
    .on('exit', exitCallback || function () {});
}
function forkProcess(cmd, args, exitCallback) {
  childProcess.fork(cmd, args || [], {env: process.env, cwd: process.cwd(), stdio:'inherit'})
    .on('exit', exitCallback || function () {});
}


/** Generic
------------------------------------------------------------------------------*/
function err() {
  /*jshint validthis:true */
  gutil.beep();
  this.emit('end');
}
function buildErr() {
  gutil.beep();
  console.log(gutil.colors.red('✖ Build Failed'));
  process.exit(1);
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  client: {
    serve: clientServe,
    build: clientBuild
  },
  server: {
    serve: serverServe,
    build: serverBuild
  },
  gulp: {
    serve: gulpServe,
    build: gulpBuild,
    changed: gulpChanged
  }
};
