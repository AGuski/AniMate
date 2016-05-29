'use strict';

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    htmlmin    = require('gulp-htmlmin'),
    replace    = require('gulp-replace'),
    ngAnnotate = require('gulp-ng-annotate'),
    es         = require('event-stream'),
    browserify = require('browserify'),
    babelify   = require('babelify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    eslint     = require('gulp-eslint'),
    templateCache = require('gulp-angular-templatecache'),
    sass       = require('gulp-sass'),
    concat  = require('gulp-concat'),
    clean      = require('gulp-clean'),
    // minifycss = require('gulp-minify-css'),
    // stripdebug = require('gulp-strip-debug'),
    // zip = require('gulp-zip');
    tinylr     = require('tiny-lr');

// Target directory for build and live watch
var build = './dist'

var paths = {
  html: ['src/**.html'],
  scss: ['src/**/*.scss']
}

gulp.task('lint', function () {
  return gulp.src(['./src/**/*.js'])
  .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

//copy the manifest to build
gulp.task('manifest', function() {
  return gulp.src('./manifest.json')
  .pipe(replace('src/', ''))
  .pipe(gulp.dest(build));
});

// scripts
gulp.task('scripts', ['lint'], function() {

  // Main files must be present for extension
  var files = ['background.js',
                  'webview.js',
                 // 'devtools.js',
                 // 'panel.js'
                 ];

  var tasks = files.map(function(entry){
    return browserify({
      // entries: entry file
      entries: './src/'+entry,
      debug: true
    })
    // Use Babel with es2015
    .transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle()
    // source: output file
    .pipe(source('./'+entry))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(ngAnnotate())
      // .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(build));

  });
  return es.merge.apply(null, tasks);
});

// html
gulp.task('html', function() {
  gulp.src('./src/modules/**/*.html')
  .pipe(templateCache('templateCacheHtml.js', {
      standalone: true,
      module: 'templates',
      root: 'modules'
    }))
    .pipe(gulp.dest(build));

  return gulp.src(paths.html)
  .pipe(replace('../bower_components', 'vendor'))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(build));
});

gulp.task('styles', function(){
  return gulp.src(paths.scss)
  .pipe(sourcemaps.init())
  .pipe(concat('panel-styles.scss'))
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(build+'/styles'));
});

gulp.task('static', function(){
  return gulp.src('./src/assets/**/*')
  .pipe(gulp.dest(build+'/assets'));
});

gulp.task('vendor', function(){
  return gulp.src('./bower_components/**/*')
  .pipe(gulp.dest(build+'/vendor'));
});

gulp.task('dev', ['manifest', 'scripts', 'html', 'styles', 'static', 'vendor'], function () {
  var lr = tinylr();
  lr.listen(35729);
  gulp.watch(['src/**/*.{js,css,scss,html,json}'], ['manifest', 'scripts', 'html', 'styles', 'static', 'vendor'], function (evt) {
      lr.changed({
          body: {
              files: [evt.path]
          }
      });
  });
});

//clean build directory
gulp.task('clean', function() {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

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
// 
// gulp.task('default', ['lint'], function () {
//     // This will only run if the lint task is successful...
// });
