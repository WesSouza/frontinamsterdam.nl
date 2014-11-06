var combinemq = require('gulp-combine-media-queries');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var deploy = require('gulp-gh-pages');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

var src = {
  html: 'src/index.html',
  images: 'src/images/**',
  scripts: 'src/scripts/*.js',
  styles: 'src/styles/*.scss'
};

gulp.task('html', function() {
  return gulp.src(src.html)
    //.pipe(plumber())
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src(src.images)
    //.pipe(plumber())
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src(src.scripts)
    //.pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    //.pipe(plumber())
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

gulp.task('deploy', ['build'], function () {
  return gulp.src('./build/**/*')
    .pipe(deploy());
});

gulp.task('default', ['connect', 'watch', 'html', 'images', 'scripts', 'styles']);
gulp.task('build', ['html', 'images', 'scripts', 'styles']);
