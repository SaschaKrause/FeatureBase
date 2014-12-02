'use strict';


/** NPM Imports
------------------------------------------------------------------------------*/
var _ = require('lodash')
  , fs = require('fs')
  , gulp = require('gulp')
  , jade = require('gulp-jade')
  , gutil = require('gulp-util')
  , ngmin = require('gulp-ngmin')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish')
  , notify = require('gulp-notify')
  , template = require('gulp-template')
  , rename = require('gulp-rename')
  , gulpMultinject = require('gulp-multinject')
  , inject = require('gulp-inject')
  , inquirer = require('inquirer')
  , runSequence = require('run-sequence')
  , clean = require('gulp-clean')
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
    FeatureBase: false,
    APP_VERSION: true
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
gulpfile.quotmark = false;


/** Gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['serve']);
gulp.task('serve', ['js:gulp', 'js:serve', 'jade', 'watch']);
gulp.task('build', ['js:gulp', 'js:build']);
gulp.task('clean', ['clear:references', 'clear:build', 'jade']);

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
    .on('error', errBuild);
    // .pipe(ngmin())
    // .pipe(uglify())
    // .pipe(gulp.dest('.tmp/buildjs'));
});

gulp.task('js:gulp', function () {
  return gulp.src('Gulpfile.js')
    .pipe(jshint(gulpfile))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', err);
});

// compile jade into html and put into build foler
gulp.task('jade', ['clear:references'], function() {
  return gulp.src(['public/app-src/**/*.jade'])
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('public/app-build'))
    .on('error', jadeErr);

});

gulp.task('watch', function () {
  gulp.watch('public/app-src/js/**/*.js', ['js:serve']);
  gulp.watch(['public/app-src/**/*.jade'], ['clean']);
  gulp.watch('gulpfile.js', gulpChanged);
});

// inject JS to index_debug
gulp.task('clear:references', function() {

  return gulp.src('views/index_debug.jade')
    .pipe(inject(gulp.src('public/app-src/pages/**/*.js', {read: false}), {name: 'pageController', ignorePath: 'public/'}))
    .pipe(gulp.dest('views/'));
});


gulp.task('clear:build', function (a) {
  console.log(a);
  // ok, we actually only clear the build/pages folder for now
  return gulp.src('public/app-build/pages/*', {read: false})
    .pipe(clean());
});



/** creators
------------------------------------------------------------------------------*/


// gulp do:page --name PageName (CamelCase)
gulp.task('do:page', function (cb) {

  console.log();

  inquirer.prompt([{
    message: 'What would you like to call the page? CamelCase bitte:',
    name: 'pageName',
    validate: function (name) {
      return !name.match(/(^[^A-Z]|\s)/) || gutil.colors.red('The name must be in CamelCase, starting with a captial letter, and no whitespace.');
    }
  }], function (answers) {
    var pageName = answers.pageName;

    if(!pageName) {
      console.log(gutil.colors.red('✖ You need to specify a page name, e.g.'), '\n  gulp do:page --name DetailListOverview');
      return process.exit(1);
    }

    console.log(gutil.colors.green('Using Page Name: ' + pageName));

    var pageRoot = 'app-src/pages/';
    var fileName = getDashedStringFromCamelCase(pageName);

    fs.exists(process.cwd() + '/public/' + pageRoot + fileName, function (exists) {
      if (exists) {
        console.log(gutil.colors.red(['\n✖', pageName, 'already exists, aborting'].join(' ')));
        console.log('  ' + process.cwd() + '/public/' + pageRoot + fileName);
        return process.exit(1);
      }
      else {

        var controllerName = pageName+'Page';
        var notifiyRoute = "{state: 'LAYOUT.STATE', url: '/ROUTE', views: {'content': {templateUrl: 'app-build/pages/"+fileName+"/page_"+fileName+".html', controller: '"+controllerName+"'} } },";
        var notifiyLess = "@import './pages/"+fileName+"/page_"+fileName+".less'";


        // create js page
        gulp.src('templates/pages/page.js')
          .pipe(template({
            name: controllerName,
            createdAt: new Date()
          }))
          .pipe(rename('page_'+fileName+".js"))
          .pipe(gulp.dest('public/'+pageRoot+fileName))

          // after page is created, add it to the index jade file
          .on('end', function () {
            // ref page in jade file
            gulp.src('views/index_debug.jade')
              .pipe(inject(gulp.src('public/'+pageRoot+"/**/*.js", {read: false}), {name: 'pageController', ignorePath: "public/"}))
              .pipe(gulp.dest('views/'));

            console.log(gutil.colors.green('\n------------------------\nToDo:\n------------------------'));
            console.log(gutil.colors.yellow('add to routes.cfg:'));
            console.log(gutil.colors.green(notifiyRoute));
          });


        // create jade page
        gulp.src('templates/pages/page.jade')
          .pipe(template({
            pageContentClass: fileName,
            createdAt: new Date()
          }))
          .pipe(rename('page_'+fileName+".jade"))
          .pipe(gulp.dest('public/'+pageRoot+fileName))
          .on('end', function() {
            runSequence('jade');
          });


        // create stylus page
        gulp.src('templates/pages/page.less')
          .pipe(template({
            pageContentClass: fileName,
            createdAt: new Date()
          }))
          .pipe(rename('page_'+fileName+".less"))
          .pipe(gulp.dest('public/'+pageRoot+fileName))
          .on('end', function() {
            console.log(gutil.colors.yellow('add to app.less:'));
            console.log(gutil.colors.green(notifiyLess));
          });
      }
    });
  });
});


/** helpers
------------------------------------------------------------------------------*/

function getDashedStringFromCamelCase(camelCased) {
  var unCapitalized = camelCased.charAt(0).toLowerCase() + camelCased.slice(1);
  return unCapitalized.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
}


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