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
        //strict: true,
        predef: [ 'define', 'Mustache' , '_', '$', 'Backbone', 'Raphael']
      }
    },
    watch: {
      files: ['<%= jshint.gruntfile %>', '<%= jshint.frontend %>', '<%= jshint.backend %>' ],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
};
