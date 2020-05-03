const {src, dest, task, watch, series, parallel} = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");

const styleSRC = "./app/css/style.scss";
const styleURL = "./dist/css/";
const htmlSRC = "./app/*.html";
const htmlURL = "./dist/";
const jsSRC = "./app/js/*.js";
const jsURL = "./dist/js/";
const imgSRC = "./app/assets/images/**/*";
const imgURL = "./dist/assets/images/";
const fontsSRC = "./app/assets/fonts/**/*";
const fontsURL = "./dist/assets/fonts/";

// const styleSRC = "./app/css/**/*.scss";
// const imgSRC = "./app/assets/images/**/*.*";
// const fontsSRC = "./app/assets/fonts/**/*.*";
// const htmlSRC = "./app/*.html";
// const jsSRC = "./app/js/*.js";

function browser_sync() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
};

function reload (done) {
  browserSync.reload();
  done();
}

function css(done) {
  src([styleSRC])
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: "expanded"
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer())
    .pipe(dest(styleURL))
    .pipe(browserSync.stream());

  done();
};

function triggerPlumber(src_file, url_file) {
  return src(src_file)
    .pipe(plumber())
    .pipe(dest(url_file));
};

function images() {
  return triggerPlumber(imgSRC, imgURL);
}

function fonts() {
  return triggerPlumber(fontsSRC, fontsURL);
}

function html() {
  return triggerPlumber(htmlSRC, htmlURL);
}

function js() {
  return triggerPlumber(jsSRC, jsURL);
}

function watch_files() {
  watch(styleSRC, series(css, reload));
  watch(jsSRC, series(js, reload));
  watch(imgSRC, series(images, reload));
  watch(fontsSRC, series(fonts, reload));
  watch(htmlSRC, series(html, reload));
}

task("css", css);
task("js", js);
task("images", images);
task("fonts", fonts);
task("html", html);

task("default", parallel(css, js, images, fonts, html));

task("watch", parallel(browser_sync, watch_files));