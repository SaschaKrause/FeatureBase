// Gulpfile.js
// Require the needed packages
var _ = require('lodash')
  , gulp = require('gulp')
  , jade = require('gulp-jade')
  , util = require('gulp-util')
  , ngmin = require('gulp-ngmin')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish')
  , notify = require("gulp-notify")
  , prompt = require('gulp-prompt')
  , template = require('gulp-template')
  , rename = require("gulp-rename")
  , gulpMultinject = require('gulp-multinject')
  , inject = require('gulp-inject')
  , runSequence = require('run-sequence')
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

// compile jade into html and put into build foler
gulp.task('jade', function() {
  gulp.src(['public/app-src/**/*.jade'])
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('public/app-build'))
    .on('error', jadeErr);
    
});

// inject JS to index_debug
gulp.task('clean', function() {
 gulp.src('views/index_debug.jade')
  .pipe(inject(gulp.src('public/app-src/pages/**/*.js', {read: false}), {name: 'pageController', ignorePath: "public/"}))
  .pipe(gulp.dest('views/'));

 gulp.src('views/index_debug.jade')
  .pipe(inject(gulp.src('public/app-src/services/**/*.js', {read: false}), {name: 'services', ignorePath: "public/"}))
  .pipe(gulp.dest('views/'));
    
});

gulp.task('watch', function () {
  gulp.watch('public/app-src/**/*.styl', ['css:stylus']);
  // gulp.watch('public/app-src/**/*.js', ['js:serve']);
  gulp.watch(['public/app-src/**/*.jade'], ['jade']);
  // gulp.watch('gulpfile.js', gulpChanged);
});








/** creators
------------------------------------------------------------------------------*/


// gulp do:page --name PageName (camelCase)
gulp.task('do:page', function () {

  console.log(util.colors.green('Using Page Name: ' + util.env.name)); 

  if(util.env.name === undefined) {
    console.log(util.colors.red('you need to specify a page name (e.g --name DetailListOverview)')); 
    return null;
  }

  // TODO: stop if page already exist

  var pageRoot = 'app-src/pages/';
  var fileName = getDashedStringFromCamelCase(util.env.name);
  var controllerName = util.env.name+'Page';
  var notifiyRoute = "{state: 'LAYOUT.STATE', url: '/ROUTE', views: {'content': {templateUrl: 'app-build/pages/"+fileName+"/page_"+fileName+".html', controller: '"+controllerName+"'} } },";
  var notifiyStylus = "@import './pages/"+fileName+"/page_"+fileName+".styl'";

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


          console.log(util.colors.green('\n------------------------\nToDo:\n------------------------'));
          console.log(util.colors.yellow('add to routes.cfg:'));
          console.log(util.colors.green(notifiyRoute));
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
    gulp.src('templates/pages/page.styl')
        .pipe(template({
          pageContentClass: fileName, 
          createdAt: new Date()
        }))
        .pipe(rename('page_'+fileName+".styl"))
        .pipe(gulp.dest('public/'+pageRoot+fileName))
        .on('end', function() {
          console.log(util.colors.yellow('add to app.styl:'));
          console.log(util.colors.green(notifiyStylus));
          runSequence('css:stylus');
        })
        

});


// gulp do:service --name ServiceName (camelCase)
gulp.task('do:service', function () {

  console.log(util.colors.green('Using Service Name: ' + util.env.name)); 

  if(util.env.name === undefined) {
    console.log(util.colors.red('you need to specify a Service name (e.g --name ResultsService)')); 
    return null;
  }

  // TODO: stop if service already exist

  var serviceRoot = 'app-src/common/services/';
  var fileName = getDashedStringFromCamelCase(util.env.name);
  var controllerName = util.env.name+'Service';

    // create js page
    gulp.src('templates/service/service.js')
        .pipe(template({
          name: controllerName, 
          createdAt: new Date()
        }))
        .pipe(rename('service_'+fileName+".js"))
        .pipe(gulp.dest('public/'+serviceRoot))
        
        // after page is created, add it to the index jade file 
        .on('end', function () {
          // ref page in jade file
          gulp.src('views/index_debug.jade')
            .pipe(inject(gulp.src('public/'+serviceRoot+"/**/*.js", {read: false}), {name: 'services', ignorePath: "public/"}))
            .pipe(gulp.dest('views/'));
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
  util.beep();
  this.emit('end');
}

function jadeErr(err) {
  /*jshint validthis:true */
  console.log('\n', err.message, '\n');
  util.beep();
  this.emit('end');
}

function gulpChanged() {
  util.beep();
  console.log(util.colors.red('\n------------------------\nRestart the Gulp process\n------------------------'));
  process.exit(0);
}