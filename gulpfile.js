var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	sync = require('browser-sync').create();

gulp.task('sass', function(){
	return gulp.src('./dev/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./app/assets/'))
		.pipe(sync.stream());
});

gulp.task('pug', function(){
	return gulp.src('./dev/views/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./app'));
});

gulp.task('babel', function(){
	return gulp.src('./dev/es6/*.js')
		.pipe(babel({
			presets: ['env'],
		}))
		.pipe(gulp.dest('./app/assets'));
});

gulp.task('js-sync', ['babel'], function(){
	browserSync.reload();
});

gulp.task('default', ['sass' , 'pug'], function(){
	sync.init({
		server: "./app"
	});
	gulp.watch('app/*.html').on('change', sync.reload);
	gulp.watch('./dev/views/**/*pug', ['pug']);
	gulp.watch('./dev/sass/**/*.scss', ['sass']);
	gulp.watch('./dev/es6/**/*.js', ['js-sync']);
});
