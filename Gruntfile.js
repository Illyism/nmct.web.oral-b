module.exports = function(grunt) {
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            "script": "js/main.js",
            "style": "css/style.css"
          }
        },
        files: {
          "index.html": ["src/html/index.jade"]
        }
      },
      build: {
        options: {
          pretty: false,
          data: {
            "script": "js/main.min.js",
            "style": "css/style.min.css"
          }
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
      },
      build: {
        options: {
          join: true,
          expand: false
        },
        files: {
          "js/main.js": ["src/js/wow.coffee", "src/js/main.coffee"]
        }
      }
    },
    less: {
      compile: {
        options: {
          cleancss: true
        },
        src: ['src/css/style.less'],
        dest: 'css/style.css'
      },
      build: {
        options: {
          cleancss: true,
          compress: true
        },
        src: ['src/css/style.less'],
        dest: 'css/style.min.css'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      build: {
        files: {
          'js/main.min.js': ['js/main.js']
        }
      }
    },
    watch: {
      jade: {
        files: ['src/html/*.jade'],
        tasks: ['jade:compile'],
      },
      less: {
        files: ['src/css/*.less'],
        tasks: ['less:compile'],
      },
      coffee: {
        files: ['src/js/*.coffee'],
        tasks: ['coffee:compile'],
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

  grunt.registerTask('default', ['jade:compile', 'less:compile', "coffee:compile", 'watch']);
  grunt.registerTask('build', ['less:compile', 'jade:build', 'less:build', "coffee:build", 'uglify:build']);
};