'use strict';

var gulp = require('gulp');


/** Copy Factory
------------------------------------------------------------------------------*/
function copy(glob, output) {
  return function () {
    return gulp.src(glob)
      .pipe(gulp.dest(output));
  }
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = copy;
