module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    shell: {
        phrase_install: {
          command: 'gem install phrase'
        },
        phrase_init: {
          command: 'phrase init --default-target=public/common/i18n/ --secret=8a1226c68ce87cbabbfdb6279c29d49b --default-locale=en-GB '
        },
        phrase_init_invars: {
          command: 'phrase init --default-target=public/common/i18n/phrase_invars/ --secret=e58aeca0cac2fc906670c798b4cc344f --default-locale=de-DE --locale-filename=phrase_invars-"<locale.name>".json'
        },
        phrase_init_exercises: {
          command: 'phrase init --default-target=public/common/i18n/exercises/ --secret=9f84c7e4a9a51017a92c9a413e283ac1 --default-locale=de-DE --locale-filename=exercises-"<locale.name>".json'
        },
        phrase_pull: {
            command: 'phrase pull --format=simple_json '
        },
        phrase_pull_exercises: {
            command: 'phrase pull --format=nested_json '
        },
        phrase_upload_only_NEW_EN: {
            command: 'phrase push public/common/i18n/phrase.en-GB.json --locale=en-GB --format=simple_json'
        }
    },

    protractor: {
      options: {
        configFile: "protractor_conf.js", // Default config file
        // debug: true,

        args: {
          seleniumPort: '4444',
          baseUrl: 'http://localhost:3003'
          // Arguments passed to the command
        }
      },
      all: {},
    },

    concat_css: {
      options: {
        // Task-specific options go here.
      },
      all: {
        src: [
          "public/app-build/css/bootstrap.css",
          "public/app-src/lib/bower/font-awesome/css/font-awesome.css",
          "public/app-build/css/app.css",
          "public/app-build/css/login.css",
          "public/app-build/css/register.css",
          "public/app-src/lib/bower/toastr/toastr.css",
          "public/app-src/lib/bower/bootstrap-select/bootstrap-select.css",
          "public/app-src/lib/bower/jquery-ui/themes/smoothness/jquery-ui.css"
        ],
        dest: "public/app-build/css/libs.css"
      },
    },
    concat: {
      jsApp: {
        src: [
          'public/app-src/js/*.js',
          'public/app-src/js/app.js',
          'public/app-src/js/configs/*.js',
          'public/app-src/js/filter/*', // ALL FILTERS
          'public/app-src/js/services/*', // ALL SERVICES
          'public/app-src/js/directives/*',
          'public/app-src/js/components/*.js',
          'public/app-src/js/components/**/*.js',
          'public/app-src/js/controllers/*.js',
          'public/app-src/js/controllers/**/*.js',
          'public/app-src/js/interceptors/**/*[!.spec].js',
          'public/app-src/pages/**/*.js',
        ],
        dest: 'public/app-build/js/app.js'
      },
      jsLib: {
        src: [
          // jquery
          'public/app-src/lib/bower/jquery/jquery.js',
          'public/app-src/lib/bower/jquery-ui/ui/jquery.ui.core.js',
          'public/app-src/lib/bower/jquery-ui/ui/jquery.ui.widget.js',
          'public/app-src/lib/bower/jquery-ui/ui/jquery.ui.mouse.js',
          'public/app-src/lib/bower/jquery-ui/ui/jquery.ui.position.js',
          'public/app-src/lib/bower/jquery-ui/ui/jquery.ui.datepicker.js',
          'public/app-src/lib/bower/jquery-ui/ui/jquery.ui.slider.js',
          'public/app-src/lib/bower/jquery-ui/ui/i18n/jquery.ui.datepicker-de.js',
          'public/app-src/lib/bower/jquery-ui/ui/i18n/jquery.ui.datepicker-en-GB.js',
          // bootstrap
          'public/app-src/lib/bower/bootstrap/js/modal.js',
          'public/app-src/lib/bower/bootstrap/js/collapse.js',
          'public/app-src/lib/bower/bootstrap-select/bootstrap-select.js',

          'public/app-src/lib/bower/toastr/toastr.js',
          // angular
          'public/app-src/lib/bower/angular/angular.js',
          'public/app-src/lib/bower/angular-resource/angular-resource.js',
          'public/app-src/lib/bower/angular-cookies/angular-cookies.js',
          'public/app-src/lib/bower/angular-ui-router/release/angular-ui-router.js',
          'public/app-src/lib/bower/angular-bootstrap/ui-bootstrap-tpls.js',
          'public/app-src/lib/bower/angular-loading-bar/build/loading-bar.min.js',
          'public/app-src/lib/bower/angular-translate/angular-translate.js',
          'public/app-src/lib/bower/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
          'public/app-src/lib/bower/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
          'public/app-src/lib/bower/angular-ui-date/src/date.js',
          'public/app-src/lib/bower/angular-ui-slider/src/slider.js',
          // small libs
          'public/app-src/lib/bower/lodash/dist/lodash.js',
          'public/app-src/lib/bower/momentjs/moment.js',
          'public/app-src/lib/bower/momentjs/lang/de.js',
          // 'public/app-src/lib/bower/underscore/underscore.js',
          'public/app-src/lib/bower/featurebase/src/featurebase.js',
          'public/app-src/lib/manual/highcharts/highcharts.js',
          'public/app-src/lib/manual/highcharts/highcharts-more.js',
        ],
        dest: 'public/app-build/js/lib.js'
      }
    },
    ngmin: {
      build: {
        src: ['public/app-build/js/app.js'],
        dest: 'public/app-build/js/app.js'
      }
    },
    uglify: {
      // good for debugging
      // options: {
      //   beautify: true
      // },
      my_target: {
        files: {
          'public/app-build/js/app.min.js': ['<%= concat.jsApp.dest %>'],
          'public/app-build/js/lib.min.js': ['<%= concat.jsLib.dest %>']
        }
      }
    },
    copy: {
      main: {
        src: 'public/app-src/lib/bower/jquery-ui/themes/smoothness/images/*',
        dest: 'public/app-build/css/images/',
        filter: 'isFile',
        expand: true,
        flatten: true
      },
    },
    jshint: {

      options: {
        expr: true,
        strict: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      app: {
        src: ['public/app-src/js/components/**/*.js']
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-shell');


  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('pack', ['concat', 'ngmin', 'uglify', 'concat_css', 'copy']);
  grunt.registerTask('check', ['jshint']);
  grunt.registerTask('pack_css', ['concat_css']);
  grunt.registerTask('e2e', ['protractor']);
  grunt.registerTask('phrase-install', ['shell:phrase_install']);
  grunt.registerTask('phrase-init', ['shell:phrase_init']);
  grunt.registerTask('phrase-pull', ['shell:phrase_init','shell:phrase_pull']);
  grunt.registerTask('phrase-pull-invars', ['shell:phrase_init_invars','shell:phrase_pull']);
  grunt.registerTask('phrase-pull-exercises', ['shell:phrase_init_exercises','shell:phrase_pull_exercises']);

};
