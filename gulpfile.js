// https://css-tricks.com/gulp-for-beginners/ to set up

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');

// watch task
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// imagemin
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin.gifsicle()))
  .pipe(gulp.dest('dist/images'))
});

// useref
gulp.task('useref', function() {
  return gulp.src('app/*.html')
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify())) // Mins only js files
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulp.dest('dist'))
});

// browser-sync reload
gulp.task('browserSync',function(){
  console.log("Running BrowserSync");
  browserSync.init({
    server: {
      baseDir: './app'
    },
  });
});

// sass build
gulp.task('sass', function(){
  console.log("Building CSS");
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError)) // src through gulp-sass
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream());
});

// fonts
gulp.task('fonts', function(){
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

// del task cleans up unused files
gulp.task('clean:dist', function(){
  return del.sync('dist');
});
