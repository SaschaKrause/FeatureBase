'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , stylus = require('gulp-stylus')
  , less = require('gulp-less')
  , plumber = require('gulp-plumber')
  , gulpLr = require('gulp-livereload')
  , prefix = require('gulp-autoprefixer')
  , reloader = require('./reloader');


/** Stylus
------------------------------------------------------------------------------*/
function stylusServe() {
  return gulp.src('app/styles/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .on('error', stylusErr)
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('.tmp/styles'))
    .on('error', err)
    .pipe(gulpLr(reloader.lr))
    .on('end', function () {
      console.log('[' + gutil.colors.blue('LiveReload') + '] injecting new styles');
    });
}

function stylusBuild() {
  return gulp.src('app/styles/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .on('error', stylusErr)
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('dist/public/styles'))
    .on('error', errBuild);
}

function stylusErr(err) {
  /*jshint validthis:true */
  var splitErr = err.message.match(/(.*?)([0-9]*)(?:\n)((?:.+\n)+)(?:\n)((?:.+\n)+)/);
  var file = splitErr[1];
  var line = splitErr[2];
  var location = splitErr[3];
  var theErr = splitErr[4];

  console.log('\n', gutil.colors.cyan(file) + gutil.colors.red(line));
  console.log(location);
  console.log(gutil.colors.red(theErr));
  gutil.beep();
  this.emit('end');
}


/** Generic
------------------------------------------------------------------------------*/
function err() {
  /*jshint validthis:true */
  gutil.beep();
  this.emit('end');
}

function errBuild() {
  gutil.beep();
  console.log(gutil.colors.red('✖ Build Failed'));
  process.exit(1);
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  serve: stylusServe,
  build: stylusBuild
};
