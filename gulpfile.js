/*jslint node: true */
'use strict';

var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');
var jest = require('gulp-jest');

var watchify = require('watchify');
var reactify = require('reactify'); 
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var less = require('gulp-less');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
// var lr= require('tiny-lr');


var dependencies = [
  'react',
  'react-router',
  'react-addons',
  'flux',
  'react-tools',
  'jquery-browserify',
  'q'
];

var paths = {
  app: './client/app/src/app.jsx',
  js: './client/app/src/**/*.*',
  styles: './client/app/styles/**/*.less',
  build:'./client/build/',
  dist:'./client/dist/'
};

var config={
  Sass:{},
  Less:{}
};

var browserifyTask = function(options) {
  // Our app bundler
  var appBundler = browserify({
    entries: [options.src], // Only need initial file, browserify finds the rest
    transform: [reactify], // We want to convert JSX to normal javascript
    debug: options.development, // Gives us sourcemapping
    cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
  });

  // We set our dependencies as externals on our app bundler when developing    
  (options.development ? dependencies : []).forEach(function (dep) {
    appBundler.external(dep);
  });
   // The rebundle process
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development,livereload()))
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  // Fire up Watchify when developing
  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }
      
  rebundle();
  if (options.development) {

    // var testFiles = glob.sync('./specs/**/*-spec.js');
    // var testBundler = browserify({
    //   entries: testFiles,
    //   debug: true, // Gives us sourcemapping
    //   transform: [reactify],
    //   cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    // });

    // dependencies.forEach(function (dep) {
    //   testBundler.external(dep);
    // });

    // var rebundleTests = function () {
    //   var start = Date.now();
    //   console.log('Building TEST bundle'); 
    //   testBundler.bundle()
    //   .on('error', gutil.log)
    //     .pipe(source('specs.js'))
    //     .pipe(gulp.dest(options.dest))
    //     .pipe(livereload())
    //     .pipe(notify(function () {
    //       console.log('TEST bundle built in ' + (Date.now() - start) + 'ms');
    //     }));
    // };

    // testBundler = watchify(testBundler);
    // testBundler.on('update', rebundleTests);
    // rebundleTests();

    // // Remove react-addons when deploying, as it is only for
    // // testing
    // if (!options.development) {
    //   dependencies.splice(dependencies.indexOf('react-addons'), 1);
    // }

    var vendorsBundler = browserify({
      debug: true,
      require: dependencies
    });
    
    // Run the vendor bundle
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));
    
  } 
};
var styleTask = function (options) {
  var run = function () {
    var start = new Date();
    console.log('Building CSS bundle');
    gulp.src(options.src)
      .pipe(less(config.Less).on('error', gutil.log))
      .pipe(concat('main.css'))
      .pipe(gulpif(!options.development,cssmin()))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development,livereload()))
      .pipe(notify(function () {
        console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };
  run();
};





gulp.task('serve', function () {
  // lr().listen(35729,function(){
  livereload.listen(35729, function(){
    console.log('live reload listening on 35729');
  });
  browserifyTask({
    development: true,
    src: paths.app,
    dest: paths.build
  });
  
  styleTask({
    development: true,
    src: paths.styles,
    dest: paths.build
  });

});

gulp.task('deploy', function () {

  browserifyTask({
    development: false,
    src: paths.app,
    dest: paths.dist
  });
  
  styleTask({
    development: false,
    src: paths.styles,
    dest: paths.dist
  });

});

gulp.task('nodemon', function(done){
  nodemon({ script: './server/app.js', env: { 'NODE_ENV': 'development'}})
  .on('restart');
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['serve','nodemon']);


// gulp.task('serve', ['browserify', 'nodemon','watch']);

// Update Express is serving the right files
// Browserify/Reactify/Serve

gulp.task('jest', function () {
  return gulp.src('./client/app/src/').pipe(jest({
    scriptPreprocessor: "./preprocessor.js",
    unmockedModulePathPatterns: [
        "node_modules/react"
    ],
    testDirectoryName: "tests",
    testPathIgnorePatterns: [
        "node_modules",
        "spec/support"
    ],
    moduleFileExtensions: [
        "js",
        "json",
        "react"
    ]
  }));
});
