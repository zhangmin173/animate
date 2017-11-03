var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var root = './src/assets';

var path = {
    less: root + '/less/',
    css: root + '/css/',
    dev: root + '/dev/',
    prod: root + '/prod/',
    lib: root + '/lib/'
}

gulp.task('css', () => {
    return gulp.src([path.less + '**/*.less','!' + path.less + 'helper/*'])
            // 最先 pipe 到 plumber 中，以便出现异常前准备捕获
            .pipe($.plumber({ errHandler: e => {
                gutil.beep(); // 哔~ 的响一声
                gutil.log(e); // 抛出异常
            }}))
            .pipe($.less())
            .pipe($.autoprefixer())
            .pipe(gulp.dest(path.css))
            .pipe($.cleanCss())
            .pipe($.rename({ suffix: '.min' }))
            .pipe(gulp.dest(path.css));
});

gulp.task('js', () => {
    return gulp.src([path.dev + '**/*.js'])
            .pipe($.plumber({ errHandler: e => {
                gutil.beep();
                gutil.log(e);
            }}))
            .pipe($.babel())
            .pipe(gulp.dest(path.prod))
            .pipe($.uglify())
            .pipe($.rename({ suffix: '.min' }))
            .pipe(gulp.dest(path.prod));
});

gulp.task('lib', () => {
    return gulp.src([path.lib + '**/*.js','!' + path.lib + '**/*.min.js'])
            .pipe($.plumber({ errHandler: e => {
                gutil.beep();
                gutil.log(e);
            }}))
            .pipe($.uglify())
            .pipe($.rename({ suffix: '.min' }))
            .pipe(gulp.dest(path.lib));
});

var d = new Date();
gulp.task('zip', () => {
    return gulp.src('./src/*')
        .pipe($.zip(d.getTime() + '.zip'))
        .pipe(gulp.dest('./'))
});

gulp.task('clean', function() {
    return gulp.src([path.css,path.prod], {read: false})
        .pipe($.clean());
});

gulp.task('watch', function() {
    gulp.watch(path.less + '**/*.less', ['css']);
    gulp.watch(path.dev + '**/*.js', ['js']);
});

gulp.task('dev', function(done) {
    $.runSequence(['css', 'js'],['watch'], done);
});

gulp.task('default', function(done) {
    $.runSequence(['css', 'js'], done);
});