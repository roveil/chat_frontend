/**
 * Created by roveil on 28.06.16.
 */
'use strict';
const gulp = require('gulp');
const jade = require('gulp-jade');
const webserver = require('gulp-webserver');
const stylus = require('gulp-stylus');
const autoprefixer = require('autoprefixer-stylus');
const concat = require('gulp-concat');
var dist = "./build",
    distCss = dist + "/css",
    distView = dist + "/views",
    distJs = dist + "/js",
    distFonts = dist + "/fonts",
    distImg = dist + "/img";

gulp.task('GetSrcJs', function () {
   return gulp.src('src/**/*.js')
       .pipe(gulp.dest(distJs));
});

gulp.task('GetStaticJs',function () {
    return gulp.src('static/*.js')
        .pipe(gulp.dest(distJs));
});

gulp.task('GetStaticCss',function () {
    return gulp.src('static/*.css')
        .pipe(gulp.dest(distCss));
});

gulp.task('GetStaticImages',function () {
    return gulp.src('static/img/*.*')
        .pipe(gulp.dest(distImg));
});

gulp.task('GetStaticFonts',function () {
    return gulp.src('static/fonts/*.*')
        .pipe(gulp.dest(distFonts));
});


gulp.task('GetTemplates', function() {
    gulp.src(['src/views/**/*.jade','!src/views/skeleton/*.jade'])
        .pipe(jade())
        .pipe(gulp.dest(distView))
});

gulp.task('GetStyle', function () {
    return gulp.src('src/styles/main.styl')
        .pipe(stylus({
            use: [autoprefixer('iOS >= 7', 'last 1 Chrome version')]
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(distCss));
});

gulp.task('server', function () {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            host: '0.0.0.0',
            port: 8080,
            fallback: '/views/index.html'
        }));
    console.log("Start web-server!");
});


gulp.task("BuildAll", ['GetSrcJs','GetStaticJs','GetStaticCss','GetStaticFonts','GetStyle','GetTemplates','GetStaticImages','server']);