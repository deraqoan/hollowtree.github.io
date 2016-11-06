let gulp = require('gulp');
let browserSync = require('browser-sync');
let reload = browserSync.reload;

gulp.task('serve', () => {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
    gulp.watch(['*.html', 'css/*.css', 'js/*.js'], { cwd: 'app' }, reload);
});

gulp.task('default', [
    'serve'
])