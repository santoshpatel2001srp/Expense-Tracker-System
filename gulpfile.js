const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const del = require('del');

// Clean task
function clean() {
    return del(['dist']);
}

// Styles task
function styles() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
}

// Scripts task
function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
}

// Build task
const build = gulp.series(clean, gulp.parallel(styles, scripts));

// Export tasks
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.build = build;
exports.default = build;
