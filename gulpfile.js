var gulp        = require('gulp');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var stringify = require('stringify');

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('txt', function () {
    return gulp.src('src/**/*.txt')
        .pipe(gulp.dest('dist/'));
});

// process JS files and return the stream.
gulp.task('js', function () {
    return browserify('src/app/app.js')
        .transform(stringify(['.txt']))
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('html-watch', ['html'], browserSync.reload);
gulp.task('txt-watch', ['txt'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['html', 'js'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch("src/app/**/*.js", ['js-watch']);
    gulp.watch('src/**/*.html', ['html-watch']);
    gulp.watch('src/**/*.txt', ['txt-watch']);
});

gulp.task('build', ['html', 'js', 'txt']);

gulp.task('default', ['serve']);
