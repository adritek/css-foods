// https://css-tricks.com/gulp-for-beginners/ to set up

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// watch task
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass'])
});

// sass build
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError)) // src through gulp-sass
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream:true
  }))
  console.log("Build complete!");
});

// browser-sync reload
gulp.task('browserSync',function(){
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})
