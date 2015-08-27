var autoprefixer = require('gulp-autoprefixer');
var combinemq = require('gulp-combine-media-queries');
var concat = require('gulp-concat');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var src = {
	images: 'src/images/**',
	scripts: 'src/scripts/main/*.js',
	styles: 'src/styles/main/*.scss',
	scriptsConference: ['src/scripts/main/0.ryejs.js', 'src/scripts/main/1.components.js', 'src/scripts/conference/*.js'],
	stylesConference: 'src/styles/conference/*.css',
	root: [
		'src/404.html',
		'src/CNAME',
		'src/conference.html',
		'src/Front-in-Amsterdam.ics',
		'src/index.html',
		'src/media-kit.html',
		'src/schedule.json',
		'src/version.txt'
	]
};

gulp.task('root', function() {
	gulp.src(src.root)
		.pipe(plumber())
		.pipe(replace('{assets-version}', Date.now()))
		.pipe(gulp.dest('build/'))
		.pipe(livereload());
});

gulp.task('images', function() {
	gulp.src(src.images)
		.pipe(plumber())
		.pipe(gulp.dest('build/images'))
		.pipe(livereload());
});

gulp.task('scripts', function() {
	gulp.src(src.scripts)
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/scripts'))
		.pipe(livereload());
});

gulp.task('styles', function() {
	gulp.src('src/styles/main/main.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer( { browsers: [ '> 1%' ] } ))
		.pipe(combinemq())
		.pipe(gulp.dest('build/styles'))
		.pipe(livereload());
});

gulp.task('scriptsConference', function() {
	gulp.src(src.scriptsConference)
		.pipe(plumber())
		.pipe(concat('conference.js'))
		.pipe(uglify({ preserveComments: 'some' }))
		.pipe(gulp.dest('build/scripts'))
		.pipe(livereload());
});

gulp.task('stylesConference', function() {
	gulp.src(src.stylesConference)
		.pipe(plumber())
		.pipe(concat('conference.css'))
		.pipe(autoprefixer( { browsers: [ '> 1%' ] } ))
		.pipe(combinemq())
		.pipe(minifycss())
		.pipe(gulp.dest('build/styles'))
		.pipe(livereload());
});

gulp.task('watch', function() {
	gulp.watch(src.root, ['root']);
	gulp.watch(src.images, ['images']);
	gulp.watch(src.styles, ['styles']);
	gulp.watch(src.scripts, ['scripts']);
	gulp.watch(src.stylesConference, ['stylesConference']);
	gulp.watch(src.scriptsConference, ['scriptsConference']);
});

gulp.task('server', function() {
	livereload.listen({ quiet: true });

	nodemon({
		script: 'server.js',
		ext: 'js',
		ignore: ['build', 'src', 'gulpfile.js'],
		env: {
			FIA_PORT: 8080
		}
	}).on('start', function () {
		gutil.log(gutil.colors.red('Front in Amsterdam is ready on http://localhost:8080'));
	}).on('restart', function () {
		// Hold on until server.js boots
		setTimeout(function () {
			gulp.src('server.js')
				.pipe(livereload());
		}, 500);
	});
});

gulp.task('default', ['server', 'watch', 'root', 'images', 'scripts', 'styles', 'scriptsConference', 'stylesConference']);
gulp.task('build', ['root', 'images', 'scripts', 'styles', 'scriptsConference', 'stylesConference']);
