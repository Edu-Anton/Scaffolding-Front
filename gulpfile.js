var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	sync = require('browser-sync').create();

gulp.task('sass', function(){
	return gulp.src('./dev/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./app/css/'))
		.pipe(sync.stream());
});

gulp.task('pug', function(){
	return gulp.src('./dev/views/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./app'));
});

gulp.task('default', ['sass' , 'pug'], function(){
	sync.init({
		server: "./app"
	});
	gulp.watch('app/*.html').on('change', sync.reload);
	gulp.watch('./dev/views/**/*pug', ['pug']);
	gulp.watch('./dev/scss/**/*.scss', ['sass']);
});
