var browserify = require('browserify'),
    concat = require('gulp-concat'),
    es6ify = require('es6ify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    rev = require('gulp-rev'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    stringify = require('stringify'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

var paths = {
  public: 'public/**',
  jade: 'app/**/*.jade',
  scripts: 'app/**/*.js',
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
  gulp.src('./**/*.js').pipe(jshint())
});

//'app/**',
gulp.task('nodemon', function () {
  nodemon({ script: 'index.js', ext: 'js', ignore: ['public/'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('>> node restart');
    })
});

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf2.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
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

gulp.task('usemin', function() {
  gulp.src('public/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('public'));
});



gulp.task('heroku:production', ['scripts', 'jade', 'less']);
gulp.task('production', ['nodemon']);
gulp.task('default', ['nodemon','jade','less','watch','watchify']);
gulp.task('build', ['jade','less','watchify','usemin']);
