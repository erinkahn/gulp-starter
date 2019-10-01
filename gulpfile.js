// https://www.youtube.com/watch?v=QgMQeLymAdU

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
    // where is my scss file
    return gulp.src('./scss/**/*.scss')
        // pass that scss file through the sass compiler
        .pipe(sass().on('error', sass.logError))
        // where do I save the compiled css
        .pipe(gulp.dest('./css'))
        // stream changes to all browsers
        .pipe(browserSync.stream());

}

//watch for changes and update for us
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;