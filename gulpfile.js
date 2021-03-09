const gulp = require("gulp"),
concat = require("gulp-concat");


const paths = {
    html: "./index.html",
src: {
    scss:"./src/**/*.scss",
    js:"./src/*.js",
    img: "./src/*.png"
  },
  build: {
    css: "./build/css/",
    js: "./build/js/",
    img: "./build/img/",
    self: "./build/",
  },
};


const buildJS = () =>
    gulp
        .src(paths.src.js)
        .pipe(concat("script.js"))
.pipe(gulp.dest(paths.build.js));

const buildCSS = () =>
    gulp
        .src(paths.src.scss)
        .pipe(sass().on("error", sass.logError))
.pipe(gulp.dest(paths.build.css))
    .pipe(browserSync.stream());



