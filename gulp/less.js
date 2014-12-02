'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , reload = require('browser-sync').reload
  , less = require('gulp-less')
  , csso = require('gulp-csso')
  , concat = require('gulp-concat')
  , prefix = require('gulp-autoprefixer');


/** Gulp Tasks
------------------------------------------------------------------------------*/
function serve(glob, output) {
  return function () {
    return gulp.src(glob)
      .pipe(less())
      .on('error', serveError)
      .pipe(prefix())
      .pipe(gulp.dest(output))
      .pipe(reload({stream: true}));
  }
}

function build(glob, output) {
  return function () {
    gulp.src(glob)
      .pipe(less())
      .on('error', buildError)
      // .pipe(prefix())
      .pipe(gulp.dest(output + '/less'))
      .pipe(concat('pixformance.min.css'))
      .pipe(csso())
      .pipe(gulp.dest(output + '/minified'))
  }
}


/** Errors
------------------------------------------------------------------------------*/
function lessError(error) {
  console.log('\n', gutil.colors.cyan(error.fileName + ':') + gutil.colors.red(error.lineNumber));
  if (error.extract) {
    for (var i = 0; i < error.extract.length; i++) {
      var line = error.extract[i];
      var prefix = i === 1 ? '  > ' : '    ';
      if (!!line) {
        console.log(prefix + '' + error.extract[i]);
      }
    }
  }
  console.log('');
  console.log(gutil.colors.red(error.message));
  console.log('');
  gutil.beep();
}
function serveError(error) {
  /*jshint validthis:true */
  lessError(error);
  this.emit('end');
}
function buildError(error) {
  lessError(error);
  console.log(gutil.colors.red('✖ Build Failed'));
  process.exit(1);
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  serve: serve,
  build: build
};
