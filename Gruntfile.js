module.exports = function(grunt) {
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          "index.html": ["src/html/index.jade"]
        }
      }
    },
    less: {
      dev: {
        options: {
          cleancss: true
        },
        src: ['src/css/style.less'],
        dest: 'css/style.css'
      }
    },
    watch: {
      jade: {
        files: ['src/html/*.jade'],
        tasks: ['jade'],
      },
      less: {
        files: ['src/css/*.less'],
        tasks: ['less'],
      },
      livereload: {
        options: { livereload: true },
        files: ['css/*.css', "js/*.js", "index.html"],
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask('default', ['jade', 'less', 'watch']);
};