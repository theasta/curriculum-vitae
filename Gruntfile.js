'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      gruntfile: ['Gruntfile.js'],
      backend: ['**/*.js', '!public/**/*.js', '!node_modules/**/*.js', '!Gruntfile.js'],
      frontend: ['public/scripts/**/*.js', '!public/scripts/vendor/**/*.js'],
      options: {
        curly: true,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: true,
        node: true,
        browser: true,
        jquery: true,
        //strict: true,
        predef: [ 'define', 'Mustache' , '_', 'Backbone', 'Raphael']
      }
    },
    watch: {
      jshint_frontend: {
        files: ['<%= jshint.frontend %>'],
        tasks: ['jshint:frontend']
      },
      jshint_backend: {
        files: ['<%= jshint.backend %>'],
        tasks: ['jshint:backend']
      },
      jshint_gruntfile: {
        files: [ '<%= jshint.gruntfile %>' ],
        tasks: ['jshint:gruntfile']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
};
