module.exports = function (grunt) {

  // task load 속도 개선
  require("jit-grunt")(grunt, {
    // 자동으로 잡히지 않을 땐 수동 매핑 해주어야 함
    includereplace: "grunt-include-replace"
  });
  // 시간 표시
  require("time-grunt")(grunt);

  var config = {
    "src": "src",
    "dest": "dist"
  }


  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // html include
    includereplace: {
      includehtml: {
        options: {
          // Task-specific options go here.
        },
        expand: true,
        // 찾을 폴더
        cwd: "src/docs/html",
        // Files to perform replacements and includes with
        src: '*.html',
        // Destination directory to copy files to
        dest: 'dist/docs/html/'
      }
    },

    // html 문법 확인
    htmlhint: {
      options: {
        htmlhintrc: "plugin-set/.htmlhintrc"
      },
      src: ["src/**/*.html"]
    },

    // sass
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: "src/",
          src: ["**/style.scss"],
          dest: "dist/",
          ext: ".css"
        }]
      }
    },

    // 서버 실행 -> 서버 및 라이브로드는 브라우저싱크 활용
    // connect: {
    //   server: {
    //     options: {
    //       port: 9001,
    //       hostname: "localhost",
    //       base: ".",
    //       // open: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/src/docs/html/main.html',
    //       livereload: 35729,
    //       // keepalive:true,
    //     }
    //   }
    // },


    // 브라우저싱크 서버실행 및 라이브리로드, 모바일 싱크
    browserSync: {
      bsFiles: {
        src: [
          "index.html",
          "dist/index.html",
          "dist/docs/html/*.html",
          "dist/**/*.css"
        ]
      },
      options: {
        watchTask: true,
        open: false,
        server: {
          baseDir: "./dist/"
        },
      }
    },

    // 파일 감시
    watch: {
      html: {
        files: ['src/**/*.html'],
        tasks: ["newer:includereplace", 'newer:htmlhint'],
      },
      css: {
        files: ["src/**/*.scss"],
        tasks: ["sass"]
      },
      configFiles: {
        // gruntfile 수정시 바로 반영
        files: ["gruntfile.js"],
      },
      options: {
        // spawn: false,
        reload: true
      }
    }

  });

  grunt.registerTask('default', ['browserSync', 'watch']);

}

