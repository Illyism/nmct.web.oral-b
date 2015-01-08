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
    coffee: {
      compile: {
        options: {
          join: true,
          expand: true
        },
        files: {
          "js/main.js": ["src/js/wow.coffee", "src/js/main.coffee"]
        }
      }
    },
    less: {
      main: {
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
      coffee: {
        files: ['src/js/*.coffee'],
        tasks: ['coffee'],
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
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.registerTask('default', ['jade', 'less', "coffee", 'watch']);
};