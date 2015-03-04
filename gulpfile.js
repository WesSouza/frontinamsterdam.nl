var combinemq = require('gulp-combine-media-queries');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

var src = {
  html: [ 'src/index.html', 'src/CNAME' ],
  images: 'src/images/**',
  scripts: 'src/scripts/*.js',
  styles: 'src/styles/*.scss'
};

gulp.task('html', function() {
  gulp.src(src.html)
    .pipe(plumber())
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src(src.images)
    .pipe(plumber())
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  gulp.src(src.scripts)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  gulp.src('src/styles/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(combinemq())
    .pipe(gulp.dest('build/styles'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(src.html, ['html']);
  gulp.watch(src.images, ['images']);
  gulp.watch(src.styles, ['styles']);
  gulp.watch(src.scripts, ['scripts']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('default', ['connect', 'watch', 'html', 'images', 'scripts', 'styles']);
gulp.task('build', ['html', 'images', 'scripts', 'styles']);
