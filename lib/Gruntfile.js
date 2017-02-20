module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['../javascripts/**/*.js'], //location of javascript files
      options: {
        predef: ["document", "console", "$", "event", "target", "alert", "XMLHttpRequest", "new", "window"], //allows for predefined things not found in js
        esnext: true, //allows for ES6 
        globalstrict: true,
        // globals: {"Sandwich":true} //name value pairs, allows to define global vars used in many files.
      }
    },
    copy: { //for bootstrap and jquery - only need to do the first time.
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist',
        src: ['**'],
        dest: '../dist'
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist',
        src: ['jquery.min.js'],
        dest: '../dist'
      }
    },
    sass: { //setup sass compilation
      dist: {
        files: {
          '../css/styles.css': '../sass/styles.scss'
        }
      }
    },
    watch: { //automatically watch for changes
      javascripts: {
        files: ['../javascripts/**/*.js'], 
        tasks: ['jshint']
      }
      // sass: {
      //   files: ['../sass/**/*.scss'],
      //   tasks: ['sass']
      // }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'copy', 'watch']);
};





