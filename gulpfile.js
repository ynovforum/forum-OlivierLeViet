const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();


gulp.task('sass', function () {
    return gulp.src('public/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer()) // Add vendor prefixes to CSS rules by Can I Use
        .pipe(cssnano()) // Minify CSS
        .pipe(gulp.dest('public/css'))
});

gulp.task('serve', ['sass'], function () {

    browserSync.init({
        proxy: "localhost:3000",
        port: 3001
    });

    gulp.watch("public/scss/**/*.scss", ['sass']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
