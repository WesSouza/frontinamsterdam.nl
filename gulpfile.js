var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var htmlmin = require('gulp-htmlmin');
var deploy = require('gulp-gh-pages');
var del = require('del');

var src = {
  scripts: 'src/scripts/*.js',
  images: 'src/images/**',
  styles: 'src/styles/*.scss',
  html: 'src/index.html'
};

// gulp.task('clean', function(cb) {
//   del('build', cb);
// });

gulp.task('scripts', function() {
  return gulp.src(src.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      // .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('images', function() {
  return gulp.src(src.images)
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  return gulp.src(src.styles)
    .pipe(sass())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('build/styles'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src(src.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());

});

gulp.task('watch', function() {
  gulp.watch(src.scripts, ['scripts']);
  gulp.watch(src.images, ['images']);
  gulp.watch(src.styles, ['styles']);
  gulp.watch(src.html, ['html']);
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

gulp.task('default', ['connect', 'watch', 'scripts', 'images', 'styles']);

gulp.task('build', ['scripts', 'images', 'styles']);
