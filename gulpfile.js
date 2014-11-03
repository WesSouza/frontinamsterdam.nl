var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var del = require('del');

var src = {
  scripts: 'src/scripts/*.js',
  images: 'src/images/**',
  styles: 'src/styles/*.scss'
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
    .pipe(gulp.dest('build/images'));
});

gulp.task('styles', function() {
  return gulp.src(src.styles)
    .pipe(sass())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('watch', function() {
  gulp.watch(src.scripts, ['scripts']);
  gulp.watch(src.images, ['images']);
  gulp.watch(src.styles, ['styles']);
});

gulp.task('default', ['watch', 'scripts', 'images', 'styles']);
