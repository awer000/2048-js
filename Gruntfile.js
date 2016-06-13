module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'public/styles/main.css': 'src/styles/main.scss',
        }
      }
    },

    browserify: {
      dist: {
        options: {
           transform: [
            ['babelify', { presets: ['es2015'] }]
          ],
          browserifyOptions: { debug: true },
          exclude: ''
        },
        files: {
           "public/scripts/app.js": ["src/scripts/app.js"]
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks("grunt-browserify");

  grunt.registerTask('default', ['sass', 'browserify']);

};
