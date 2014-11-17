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
      main: {
        files: [
          {expand: true, src: ['src/js/**'], dest: 'annotate/'}
        ]
      }
    },

    // Makes sure everything is dependency injected
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      target1: {
        files: {
          'annotate/src/js/main.js': ['annotate/src/js/main.js']
        }
      }
    },

    // Concatenate the JavaScript files
    concat: {
      target1: {
        files: {
          'build/js/main.js': [
            'annotate/src/js/main.js'
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
      target1: ['Gruntfile.js', 'src/**/*.js']
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: 'src/index.html'
      }
    },

    // Minifies the build
    uglify: {
      app: {
        src: 'build/js/main.js',
        dest: 'build/js/main.min.js'
      },
      templates: {
        src: 'build/js/templates.js',
        dest: 'build/js/templates.min.js', 
      }
    },

    //Combining templates
    ngtemplates: {
      lemonadeApp: {
        //cwd: Folder root where the templates are usually served up from
        cwd: 'src',
        src: 'templates/**.html',
        dest: 'build/js/templates.js'
      }
    },

    // Remove the unnecessary files
    clean: {
      src: ['annotate/**'],
      templates: ['src/js/templates.min.js']
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
    'clean:templates',
    'copy',
    'wiredep',
    'ngAnnotate',
    'jshint', 
    'concat',
    'ngtemplates',    
    'uglify',
    'clean'
  ]);

};