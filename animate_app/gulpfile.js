'use strict';

//npm install gulp gulp-minify-css gulp-uglify gulp-clean gulp-cleanhtml gulp-jshint gulp-strip-debug gulp-zip --save-dev

var gulp = require('gulp'),
    // clean = require('gulp-clean'),
    // cleanhtml = require('gulp-cleanhtml'),
    // minifycss = require('gulp-minify-css'),
    // jshint = require('gulp-jshint'),
    // stripdebug = require('gulp-strip-debug'),
    // uglify = require('gulp-uglify'),
    // zip = require('gulp-zip');
    tinylr = require('tiny-lr');

gulp.task('dev', function () {
    var lr = tinylr();
    lr.listen(35729);
    gulp.watch(['src/**.{js,css,html}'], function (evt) {
        lr.changed({
            body: {
                files: [evt.path]
            }
        });
    });
});

// //clean build directory
// gulp.task('clean', function() {
//     return gulp.src('dist/*', {read: false})
//         .pipe(clean());
// });

// //copy static folders to build directory
// gulp.task('copy', function() {
//     gulp.src('src/fonts/**')
//         .pipe(gulp.dest('dist/fonts'));
//     gulp.src('src/icons/**')
//         .pipe(gulp.dest('dist/icons'));
//     gulp.src('src/_locales/**')
//         .pipe(gulp.dest('dist/_locales'));
//     return gulp.src('src/manifest.json')
//         .pipe(gulp.dest('dist'));
// });

// //copy and compress HTML files
// gulp.task('html', function() {
//     return gulp.src('src/*.html')
//         .pipe(cleanhtml())
//         .pipe(gulp.dest('dist'));
// });

// //run scripts through JSHint
// gulp.task('jshint', function() {
//     return gulp.src('src/**.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// //copy vendor scripts and uglify all other scripts, creating source maps - NOT DONE
// gulp.task('scripts', ['jshint'], function() {
//     gulp.src('src/scripts/vendors/**/*.js')
//         .pipe(gulp.dest('dist/scripts/vendors'));
//     return gulp.src(['src/scripts/**/*.js', '!src/scripts/vendors/**/*.js'])
//         .pipe(stripdebug())
//         .pipe(uglify({outSourceMap: true}))
//         .pipe(gulp.dest('dist/scripts'));
// });

// //minify styles
// gulp.task('styles', function() {
// //  return gulp.src('src/styles/**/*.css')
// //      .pipe(minifycss({root: 'src/styles', keepSpecialComments: 0}))
// //      .pipe(gulp.dest('dist/styles'));
//     return gulp.src('src/styles/**')
//         .pipe(gulp.dest('dist/styles'));
// });

// //build ditributable and sourcemaps after other tasks completed
// gulp.task('zip', ['html', 'scripts', 'styles', 'copy'], function() {
//     var manifest = require('./src/manifest'),
//         distFileName = manifest.name + ' v' + manifest.version + '.zip',
//         mapFileName = manifest.name + ' v' + manifest.version + '-maps.zip';
//     //collect all source maps
//     gulp.src('dist/scripts/**/*.map')
//         .pipe(zip(mapFileName))
//         .pipe(gulp.dest('dist'));
//     //build distributable extension
//     return gulp.src(['dist/**', '!dist/scripts/**/*.map'])
//         .pipe(zip(distFileName))
//         .pipe(gulp.dest('dist'));
// });

// //run all tasks after build directory has been cleaned
// gulp.task('default', ['clean'], function() {
//     gulp.start('zip');
// });
