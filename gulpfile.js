"use strict";

var gulp = require('gulp'),
	browserify = require('browserify'),
	watch = require('gulp-watch'),
	source = require('vinyl-source-stream')
;

// js
gulp.task( 'js', function() {

	return browserify('init.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('build/js'))
	;
} );

// watch
gulp.task( 'watch', function() {

	gulp.watch( 'src/**/*.js', ['js'] );
} );