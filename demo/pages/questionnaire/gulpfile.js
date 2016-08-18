'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    styl = require('gulp-stylus'),
    ts = require('gulp-typescript'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');

var IN = './',
    OUT = './dist/';

gulp.task('buildJade', function() {
    gulp.src('jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('view'))
});

gulp.task('buildStyl', function() {
    gulp.src('stylus/*.styl')
        .pipe(styl())
        .pipe(gulp.dest('css'));
});

gulp.task('buildTs', function() {
    gulp.src('typescript/*.ts')
        .pipe(ts())
        .pipe(gulp.dest('js'));
});

gulp.task('webServer', function() {
    connect.server({
        root: './',
        livereload: true,
        port: 2345
    });
});

gulp.task('reloadHtml', function() {
    gulp.src('view/*.html')
        .pipe(connect.reload());
});

gulp.task('reloadCss', function() {
    gulp.src('css/*.css')
        .pipe(connect.reload());
});

gulp.task('reloadJs', function() {
    gulp.src('js/*.js')
        .pipe(connect.reload());
});

gulp.task('watchFiles', function() {
    gulp.watch('jade/*.jade', ['buildJade']);
    gulp.watch('stylus/*.styl', ['buildStyl']);
    gulp.watch('typescript/*.ts', ['buildTs']);
    gulp.watch('view/*.html', ['reloadHtml']);
    gulp.watch('css/*.css', ['reloadCss']);
    gulp.watch('js/*.js', ['reloadJs']);
});

gulp.task('default', ['webServer', 'watchFiles']);