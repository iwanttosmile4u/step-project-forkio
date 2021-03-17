const gulp = require("gulp"),
  concat = require("gulp-concat"),
  imagemin = require("gulp-imagemin"),
  clean = require("gulp-clean"),
  browserSync = require("browser-sync").create(),
  autoprefixer = require("gulp-autoprefixer"),
  sass = require("@selfisekai/gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  uglify = require("gulp-uglify");

sass.compiler = require("sass");

const paths = {
  src: {
    scss: "./src/scss/**/*.scss",
    js: "./src/js/*.js",
    img: "./src/img/**/*",
  },
  dist: {
    css: "./dist/css/",
    js: "./dist/js/",
    img: "./dist/img/",
    self: "./dist/",
  },
};

const buildJS = () =>
  gulp
    .src(paths.src.js)
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());

const buildCSS = () =>
  gulp
    .src(paths.src.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("styles.min.css"))
    // .pipe(
    //   autoprefixer({
    //     cascade: false,
    //   })
    // )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());

const buildIMG = () =>
  gulp
    .src(paths.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.img))
    .pipe(browserSync.stream());

const cleanDist = () => gulp.src(paths.dist.self).pipe(clean());

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch(paths.src.scss, buildCSS).on("change", browserSync.reload);
  gulp.watch(paths.src.js, buildJS).on("change", browserSync.reload);
  gulp.watch(paths.src.img, buildIMG).on("change", browserSync.reload);
};

gulp.task(
  "default",
  gulp.series(cleanDist, gulp.parallel(buildCSS, buildJS, buildIMG), watcher)
);
