"use strict";

const gulp = require('gulp'),
	browserify = require('browserify'),
	watch = require('gulp-watch'),
	source = require('vinyl-source-stream')
;

// js
gulp.task( 'js', () => {

	return browserify('src/init.js')
		//.transform('babelify', {presets: ['es2015']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('build/js'))
	;
} );

// watch
gulp.task( 'watch', () => {

	gulp.watch( 'src/**/*.js', ['js'] );
} );