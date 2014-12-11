var browserify = require('browserify'),
    concat = require('gulp-concat'),
    es6ify = require('es6ify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('gulp-bower'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    karma = require('gulp-karma'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    rev = require('gulp-rev'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    stringify = require('stringify'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    mocha = require('gulp-mocha'),
    exit = require('gulp-exit');

var paths = {
  public: 'public/**',
  jade: 'app/**/*.jade',
  scripts: 'app/**/*.js',
  staticFiles: [
    'app/**',
    '!app/**/*.+(less|css|js|jade)'
  ],
  unitTests: [
    'public/lib/angular/angular.js',
    'public/lib/angular-mocks/angular-mocks.js',
    'public/lib/angular-route/angular-route.js',
    'public/lib/angular-ui-router/release/angular-ui-router.js',
    'public/lib/angular-cookies/angular-cookies.js',
    'public/lib/angular-bootstrap/ui-bootstrap.js',
    'public/lib/hammerjs/hammer.js',
    'public/lib/angular-aria/angular-aria.js',
    'public/lib/angular-material/angular-material.js',
    'public/lib/angular-animate/angular-animate.js',
    'public/lib/angular-sanitize/angular-sanitize.js',
    'public/lib/angularfire/dist/angularfire.js',
    'public/lib/moment/moment.js',
    'public/lib/firebase/firebase.js',
    'public/js/index.js',
    'public/lib/lodash/dist/lodash.min.js',
    'app/test/**/*.js'],
  libTests:['lib/test/**/*.js'],
  styles: 'app/styles/*.+(less|css)'
}

gulp.task('jade', function() {
  gulp.src('./app/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
});

gulp.task('less', function () {
  gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('lint', function () {
  return 
    gulp.src(['./app/**/*.js','./index.js','./lib/**/*.js']).pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('static-files',function(){
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'index.js', ext: 'js', ignore: ['public/'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('>> node restart');
    })
});

gulp.task('test:ui',['browserify'], function() {
  // Be sure to return the stream
  return gulp.src(paths.unitTests)
    .pipe(karma({
      configFile: 'karma.conf2.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('test:one', function() {

  var argv = process.argv.slice(3);
  console.log(argv);

  var testPaths = paths.unitTests;
  testPaths = testPaths.splice(0,testPaths.length-1);

  if(argv[0] === '--file' && argv[1] !== undefined) {
    testPaths.push('app/test/' + argv[1].trim());
  }

  return gulp.src(testPaths)
  .pipe(karma({
    configFile: 'karma.conf.js',
    action: 'run'
  }))
  .on('error', function(err) {
    // Make sure failed tests cause gulp to exit non-zero
    throw err;
  });
});

gulp.task('test:lib', function() {
  return gulp.src(paths.libTests)
    .pipe(mocha({
        reporter: 'dot',
        timeout: 60000
    }));
});


gulp.task('watch', function() {
  // livereload.listen({ port: 35729 });
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
  // gulp.watch(paths.public).on('change', livereload.changed);
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify('./app/application.js', watchify.args));
  bundler.transform(stringify(['.html']));
  // bundler.transform(es6ify);
  bundler.on('update', rebundle);
  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      .pipe(gulp.dest('./public/js'));
  }
  return rebundle();
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'))
});

gulp.task('browserify', function() {
 var b = browserify();
 b.add('./app/application.js');
 return b.bundle()
 .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
 .on('error', gutil.log.bind(gutil, 'Browserify Error: in browserify gulp task'))
 .pipe(source('index.js'))
 .pipe(gulp.dest('./public/js'));
});

gulp.task('usemin', function() {
  gulp.src('public/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['jade','less','static-files','browserify','bower']);
gulp.task('heroku:production', ['build']);
gulp.task('production', ['nodemon','build']);
gulp.task('default', ['nodemon','jade','less','watch','build']);
gulp.task('test', ['test:ui','test:lib']);
