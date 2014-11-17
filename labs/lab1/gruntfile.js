'use strict';

module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-wiredep');

	grunt.initConfig({

	 wiredep: {
      app: {
        src: 'src/index.html'
      }
    },
     });

	 grunt.registerTask('default', [
    'wiredep'
  ]);

};