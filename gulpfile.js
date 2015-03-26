var autoprefixer = require('gulp-autoprefixer');
var combinemq = require('gulp-combine-media-queries');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

var src = {
  images: 'src/images/**',
  scripts: 'src/scripts/*.js',
  styles: 'src/styles/*.scss',
  root: [ 'src/index.html', 'src/CNAME', 'src/Front-in-Amsterdam.ics' ]
};

gulp.task('root', function() {
  gulp.src(src.root)
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
    .pipe(autoprefixer( { browsers: [ '> 1%' ] } ))
    .pipe(combinemq())
    .pipe(gulp.dest('build/styles'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(src.root, ['root']);
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

gulp.task('default', ['connect', 'watch', 'root', 'images', 'scripts', 'styles']);
gulp.task('build', ['root', 'images', 'scripts', 'styles']);
