'use strict';

var gulp = require('gulp')
  , del = require('del');


/** Clean Factory
------------------------------------------------------------------------------*/
function clean(glob) {
  return function (callback) {
    del(glob, callback);
  };
}

/** Exports
------------------------------------------------------------------------------*/
module.exports = clean;
