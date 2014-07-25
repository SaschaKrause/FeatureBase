'use strict';


/** NPM Imports
------------------------------------------------------------------------------*/
var _ = require('lodash')
  , gulp = require('gulp')
  , gutil = require('gulp-util')
  , ngmin = require('gulp-ngmin')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish');


/** jshint options
------------------------------------------------------------------------------*/
var core = {
  devel: true,
  // esnext: true,
  bitwise: false,
  camelcase: false,
  curly: false,
  eqeqeq: true,
  expr: true,
  freeze: true,
  immed: true,
  indent: 2,
  latedef: 'nofunc',
  globalstrict: true,
  newcap: true,
  noarg: true,
  noempty: false,
  nonbsp: true,
  nonew: true,
  quotmark: 'single',
  regexp: true,
  strict: true,
  trailing: true,
  smarttabs: true,
  undef: true,
  unused: false,
  white: true,
  globals: {
    _: false,
    FB: false,
    '$': false,
    jQuery: false,
    moment: false,
    angular: false,
    toastr: false,
    Highcharts: false
  }
};

var serve = _.extend(core, {
  browser: true
});

var build = _.extend(core, {
  // browser: true,
  // // noempty: true,
  // unused: false
});

var gulpfile = _.extend(core, {
  node: true,
  laxcomma: true
});


/** Gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['serve']);
gulp.task('serve', ['js:gulp', 'js:serve', 'watch']);

gulp.task('js:serve', function () {
  return gulp.src('public/app-src/js/**/*.js')
    .pipe(jshint(serve))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', err);
});

gulp.task('js:build', function () {
  return gulp.src('public/app-src/js/**/*.js')
    .pipe(jshint(build))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', errBuild)
    .pipe(ngmin())
    // .pipe(uglify())
    .pipe(gulp.dest('dist/public/scripts'));
});

gulp.task('js:gulp', function () {
  return gulp.src('Gulpfile.js')
    .pipe(jshint(gulpfile))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', err);
});

gulp.task('watch', function () {
  gulp.watch('public/app-src/js/**/*.js', ['js:serve']);
  gulp.watch('gulpfile.js', gulpChanged);
});


/** Errors
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
function gulpChanged() {
  gutil.beep();
  console.log(gutil.colors.red('\n------------------------\nRestart the Gulp process\n------------------------'));
  process.exit(0);
}