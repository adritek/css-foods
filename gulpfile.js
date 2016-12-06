// https://css-tricks.com/gulp-for-beginners/ to set up

var gulp = require('gulp');
var sass = require('gulp-sass');
// var uglify = require('gulp-uglify');

var DEST = 'build/';

gulp.task('sass', function(){
  return gulp.src('app/scss/styles.scss')
  .pipe(sass()) // src through gulp-sass
  .pipe(gulp.dest('app/css'))
  console.log("Build complete!");
});
