var gulp = require('gulp');
var usemin = require('gulp-usemin');

gulp.task('default', function() {
   gulp.src('./src/main/front/external/**/*.*')
   .pipe(gulp.dest('./src/main/webapp/app/external/'));
   gulp.src('./src/main/front/app/css/**/*.*')
   .pipe(gulp.dest('./src/main/webapp/app/css/'));
   gulp.src('./node_modules/font-awesome/fonts/**/*.*')
   .pipe(gulp.dest('./src/main/webapp/app/external/font-awesome/fonts/'));
  return gulp.src('./src/main/front/**/*.html')
    .pipe(usemin({
      html: [],
      css: [],
      js: []
    }))
    .pipe(gulp.dest('./src/main/webapp/'));
});
