'use strict';

var nodemon = require('nodemon')
  , http = require('http')
  , gutil = require('gulp-util')
  , browserSync = require('browser-sync');

var httpOptions = {
  host: null,
  port: null,
  path: null
};

/** Start server
------------------------------------------------------------------------------*/
function start(host, port, path) {
  return function (callback) {
    httpOptions.host = host;
    httpOptions.port = port;
    httpOptions.path = path;
    nodemon('server/server.js --watch server --watch server/server.js --ignore node_modules/')
      .on('restart', onRestart)
      .on('log', onLog)
      .on('start', onStart);

    waitForNode(callback);
  }
}


/** Callbacks
------------------------------------------------------------------------------*/
function onLog(log) {
  console.log([
    '[',
    gutil.colors.yellow('nodemon'),
    '] ',
    log.message
  ].join(''));
}

function onRestart(files) {
  waitForNode(browserSync.reload, [{changed: files[0]}]);
}

function onStart() {
  console.log([
    '[', gutil.colors.yellow('nodemon'), ']',
    ' waiting for route ',
    gutil.colors.cyan(httpOptions.path),
    ' to return successfully'
  ].join(''));
}

function waitForNode(callback, params) {
  setTimeout(function () {
    checkIfReady(callback, params);
  }, 100);
}

function checkIfReady(callback, params) {
  http.get(httpOptions, function () {
    callback.apply(callback, params);
  }).on('error', function () {
    waitForNode(callback, params);
  });
}


/** Exports
------------------------------------------------------------------------------*/
module.exports = {
  start: start
};
