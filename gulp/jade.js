'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , cached = require('gulp-cached')
  , remember = require('gulp-remember')
  , reload = require('browser-sync').reload
  , useref = require('gulp-useref')
  , filter = require('gulp-filter')
  , rename = require('gulp-rename')
  , jade = require('gulp-jade');


/** Gulp Tasks
------------------------------------------------------------------------------*/
function serve(glob, output) {
  return function () {
    return gulp.src(glob)
      .pipe(cached('jade'))
      .pipe(jade({pretty: true}))
      .on('error', serveError)
      .pipe(reload({stream: true}))
      .pipe(remember('jade'))
      .pipe(gulp.dest(output));
  }
}

function build(glob, output) {
  return function () {
    return gulp.src(glob)
      .pipe(jade({pretty: true}))
      .on('error', buildError)
      .pipe(gulp.dest(output))
      .pipe(filter('index.html'))
      .pipe(rename('index-debug.html'))
      .pipe(gulp.dest(output))
      .pipe(useref())
      .pipe(rename('index.html'))
      .pipe(gulp.dest(output))
  }
}


/** Errors
------------------------------------------------------------------------------*/
function jadeError(error) {
  var splitErr = error.message.match(/(.*?)([0-9]*)(?:\n)((?:.+\n)+)(?:\n)(.*$)/);

  var file = splitErr[1];
  var line = splitErr[2];
  var location = splitErr[3];
  var theErr = splitErr[4];

  console.log('\n', gutil.colors.cyan(file) + gutil.colors.red(line));
  console.log(location);
  console.log(gutil.colors.red(theErr));
  console.log();
  gutil.beep();
}
function serveError(error) {
  /*jshint validthis:true */
  jadeError(error);
  this.emit('end');
}
function buildError(error) {
  jadeError(error);
  console.log(gutil.colors.red('✖ Build Failed'));
  process.exit(1);
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  serve: serve,
  build: build
};
