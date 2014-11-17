'use strict';

module.exports = function(grunt) {

  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ng-annotate');

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

  });

  // Define the default task
  grunt.registerTask('default', [
    'copy',
    'ngAnnotate'
  ]);

};