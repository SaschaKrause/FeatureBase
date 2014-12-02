

/** Normal npm requires
------------------------------------------------------------------------------*/
var _ = require('lodash')
  , gulp = require('gulp')
  , cached = require('gulp-cached')
  , gutil = require('gulp-util');


/** Define globals
------------------------------------------------------------------------------*/
GLOBAL.HTTP_HOST = 'localhost';
GLOBAL.HTTP_PORT = process.env.PORT = 3003;
GLOBAL.TEST_PATH = '/';
GLOBAL.LIVERELOAD_PORT = 35729;
GLOBAL.JADE = ['client/**/*.jade'];
GLOBAL.LESS = {
  all: ['client/**/*.less'],
  main: ['client/less/app.less',
    'client/less/bootstrap.less',
    'client/less/login.less',
    'client/less/register.less']
};
GLOBAL.CLIENT_JS = ['client/**/*.js', '!client/lib/**/*.js'];
GLOBAL.SERVER_JS = ['server/**/*.js', 'server.js'];
GLOBAL.GULP_FILES = ['gulpfile.js', 'chunks/**/*.js'];
GLOBAL.JSHINT_FILES = {
  client: '.jshintrc',
  server: 'server/.jshintrc'
};


/** Chunk imports
------------------------------------------------------------------------------*/
var js = require('./chunks/js')
  , open = require('./chunks/open')
  , copy = require('./chunks/copy')
  , clean = require('./chunks/clean')
  , build = require('./chunks/build')
  , heroku = require('./chunks/heroku')
  , styles = require('./chunks/styles')
  , reloader = require('./chunks/reloader')
  , templates = require('./chunks/templates')
  , nodeServer = require('./chunks/node-server');

reloader.init();


/** Chunks
------------------------------------------------------------------------------*/
gulp.task('gulp', js.gulp.serve);
gulp.task('clean:tmp', clean.tmp.all);
gulp.task('jade', templates.jade.serve);
gulp.task('styles', styles.less.serve);
gulp.task('clientjs', js.client.serve);
gulp.task('serverjs', js.server.serve);
gulp.task('startNode', ['styles', 'jade', 'clientjs', 'serverjs'], nodeServer.start);
gulp.task('openProject', ['startNode'], open.project);

gulp.task('clean:dist', clean.dist);
gulp.task('gulp:build', js.gulp.build);
gulp.task('stylus:build', ['clean:dist'], styles.stylus.build);
gulp.task('clientjs:build', ['clean:dist', 'gulp:build'], js.client.build);
gulp.task('serverjs:build', ['clean:dist', 'gulp:build'], js.server.build);
gulp.task('copy:views', ['clean:dist'], copy.views);
gulp.task('copy:styles', ['clean:dist'], copy.styles);
gulp.task('copy:images', ['clean:dist'], copy.images);
gulp.task('copy:favicon', ['clean:dist'], copy.favicon);
gulp.task('copy:heroku', ['clean:dist'], copy.heroku);
gulp.task('copy:bowerComponents', ['clean:dist'], copy.bowerComponents);

gulp.task('hat', ['jade', 'jadewatch']);
gulp.task('jadewatch', function () {
  gulp.watch(JADE, ['jade'])                            // watch the same files in our scripts task
    .on('change', function (event) {
      if (event.type === 'deleted') {                   // if a file is deleted, forget about it
        delete cached.caches.templates[event.path];     // gulp-cached remove api
        remember.forget('templates', event.path);       // gulp-remember remove api
      }
      console.log('fin');
    });
});
/** Gulp serve/watch/reload
------------------------------------------------------------------------------*/
gulp.task('default', ['clean:tmp'], function () {
  gulp.run('serve');
});
gulp.task('go', ['serve', 'openProject']);
gulp.task('serve', [
  'gulp',
  'jade',
  'styles',
  'clientjs',
  'serverjs',
  'startNode',
  'watch'
]);

gulp.task('watch', function () {
  gulp.watch([].concat(CLIENT_JS, JADE), reloader.reload);
  // gulp.watch([
    // 'app/views/**/*.html',
    // 'app/scripts/**/*.js',
    // 'app/images/**/*.*'
  // ], reloader.reload);

  gulp.watch(JADE, ['jade']);
  gulp.watch(LESS.all, ['styles']);
  gulp.watch(CLIENT_JS, ['clientjs']);
  gulp.watch(SERVER_JS, ['serverjs']);
  gulp.watch(GULP_FILES.concat(_.toArray(JSHINT_FILES)), js.gulp.changed);
});


/** Gulp build
 ** build core is used by deploy also, that's why build and buildCore
------------------------------------------------------------------------------*/
gulp.task('buildCore', [
  'gulp:build',
  'clean:dist',
  'serverjs:build',
  'stylus:build',
  'clientjs:build',
  'copy:bowerComponents',
  'copy:heroku',
  'copy:favicon',
  'copy:images',
  'copy:styles',
  'copy:views'
]);
gulp.task('build', ['buildCore'], build.run);


/** Gulp deploy
------------------------------------------------------------------------------*/
gulp.task('deploy', ['buildCore'], heroku.deploy);
