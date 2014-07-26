// Gulpfile.js
// Require the needed packages
var _ = require('lodash')
  , gulp = require('gulp')
  , jade = require('gulp-jade')
  , gutil = require('gulp-util')
  , ngmin = require('gulp-ngmin')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish')
  , prompt = require('gulp-prompt')
  , stylus = require('gulp-stylus');


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
    Highcharts: false,
    FeatureBase: false
  }
};

var serve = _.extend({}, core);
serve.browser = true;

var build = _.extend({}, core);
build.browser = true;
build.devel = false;
build.noempty = true;
build.unused = true;

var gulpfile = _.extend({}, core);
gulpfile.node = true;
gulpfile.laxcomma = true;
gulpfile.globals._ = true;


/** Gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['serve']);
gulp.task('serve', ['css:stylus', 'jade', 'watch']);
gulp.task('page', ['create:page']);
// gulp.task('serve', ['css:stylus', 'js:serve', 'watch']);


// Get and render all .styl files recursively


gulp.task('create:page', function () {

  gulp.src('templates/pages/**/*.js')
    .pipe(prompt.prompt({
        type: 'input',
        name: 'task',
        message: 'Which task would you like to run?'
    }, function(res){
        //value is in res.task (the name option gives the key)
        return res.task;
    })).
    pipe(gulp.dest('dest'));

});

gulp.task('css:stylus', function () {
  gulp.src('public/app-src/**/*.styl')
    .pipe(stylus({compress: true}))
    .pipe(gulp.dest('public/app-build/css'))
    .on('error', err);
});


gulp.task('js:serve', function () {
  return gulp.src('public/app-src/**/*.js')
    .pipe(jshint(serve))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', err);
});

gulp.task('jade', function() {
  gulp.src(['public/app-src/**/*.jade'])
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('public/app-build'))
    .on('error', jadeErr);
    
});

gulp.task('watch', function () {
  gulp.watch('public/app-src/**/*.styl', ['css:stylus']);
  // gulp.watch('public/app-src/**/*.js', ['js:serve']);
  gulp.watch(['public/app-src/**/*.jade'], ['jade']);
  // gulp.watch('gulpfile.js', gulpChanged);
});




/** Errors
------------------------------------------------------------------------------*/

function err() {
  /*jshint validthis:true */
  gutil.beep();
  this.emit('end');
}

function jadeErr(err) {
  /*jshint validthis:true */
  console.log('\n', err.message, '\n');
  gutil.beep();
  this.emit('end');
}

function gulpChanged() {
  gutil.beep();
  console.log(gutil.colors.red('\n------------------------\nRestart the Gulp process\n------------------------'));
  process.exit(0);
}