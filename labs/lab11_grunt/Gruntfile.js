'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Doesn't fit the glob pattern above
  //  require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});
  //  It is wiredep in our package.json
  grunt.loadNpmTasks('grunt-wiredep');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Makes a copy of the source files into the annotate folder
    copy: {
      app: {
        files: [
          {expand: true, src: ['src/js/**'], dest: 'annotate/'}
        ]
      }
    },

    // Makes sure everything is dependency injected
    ngAnnotate: {
      options: {
        singleQuotes: true,
        remove: true
      },
      app: {
        files: {
          'annotate/temp/main.js' : ['annotate/src/js/main.js'],
          'annotate/temp/controllers.js': [
            'annotate/src/js/controller/footer-controller.js',
            'annotate/src/js/controller/give_form-controller.js',
            'annotate/src/js/controller/give-controller.js',
            'annotate/src/js/controller/header-controller.js',
            'annotate/src/js/controller/home-controller.js',
            'annotate/src/js/controller/product-controller.js',
            'annotate/src/js/controller/report_donors-controller.js',
            'annotate/src/js/controller/report_sales-controller.js',
            'annotate/src/js/controller/report_transactions-controller.js',
            'annotate/src/js/controller/report-controller.js',
            'annotate/src/js/controller/sell-controller.js',
            'annotate/src/js/controller/supplies-controller.js',
          ],
          'annotate/temp/directives.js' : [
            'annotate/src/js/directive/lemon-title-directive.js',
            'annotate/src/js/directive/report_listing-directive.js'
          ],
          'annotate/temp/filters.js' : ['annotate/src/js/filters.js'],
          'annotate/temp/services.js' : [
            'annotate/src/js/service/constants.js',
            'annotate/src/js/service/philanthropist_api-service.js',
            'annotate/src/js/service/supplies_api-service.js', 
            'annotate/src/js/service/transaction_api-service.js',           
            'annotate/src/js/service/current_location-service.js',
            'annotate/src/js/service/distance-service.js',
            'annotate/src/js/service/supplies-service.js',
            'annotate/src/js/service/transaction-service.js',
            'annotate/src/js/service/transformer/donors_response-transformer.js',
            'annotate/src/js/service/transformer/supplies_response-transformer.js'
          ],
          'annotate/temp/states.js' : [
            'annotate/src/js/state/general-states.js',
            'annotate/src/js/state/reports-states.js',
            'annotate/src/js/state/sell-states.js'
          ]
        }
      }
    },

    // Concatenate the JavaScript files
    concat: {
      annotate: {
        files: {
          'build/js/main.js': [
            'annotate/temp/main.js',
            'annotate/temp/controllers.js',
            'annotate/temp/directives.js',
            'annotate/temp/filters.js',
            'annotate/temp/services.js',
            'annotate/temp/states.js'
          ]
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      app: ['Gruntfile.js', 'src/**/*.js']
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: 'src/index.html'
      }
    },

    // Minifies the build
    uglify: {
      build: {
        src: 'build/js/main.js',
        dest: 'build/js/main.min.js'
      }
    },

    // Remove the unnecessary files
    clean: {
      annotateSource: ['annotate/src/**'],
      annotateTemp: ['annotate/temp/**'],
      build: ['build/**']
    },

    //Live watching
    watch: {
      scripts: {
        files: [
          'src/index.html',
          'src/js/**',
          'build/**',
          'annotate/temp/**'
        ],
        options: {
          livereload: true
        }
      }
    }


  });

  // Define the default task
  grunt.registerTask('default', [
    'copy',
    'wiredep',
    'ngAnnotate',
    'jshint', 
    'concat',
    'uglify',
    'clean:annotateSource'
  ]);

};