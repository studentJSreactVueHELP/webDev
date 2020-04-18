const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function() {

		browserSync.init({
				server: {
						baseDir: "dist"
				}
      });
      gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('styles', function() {
		return gulp.src("src/sass/**/*.+(sass|scss)")
						.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
						.pipe(rename({
							prefix: "",
							suffix: ".min",
						}))
						// .pipe(autoprefixer())
						.pipe(cleanCSS({compatibility: 'ie8'}))
						.pipe(gulp.dest("dist/css"))
						.pipe(browserSync.stream());
});

gulp.task('watch', function(){
        gulp.watch("src/sass/**/*.+(sass|scss|css)", gulp.parallel("styles"));
		  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
});

gulp.task('html', function(){
   return gulp.src("src/*.html")
               .pipe(htmlmin({ collapseWhitespace: true }))
               .pipe(gulp.dest("dist/"));
});

gulp.task('img', function(){
   return gulp.src("src/img/**/*")
               .pipe(imagemin())
               .pipe(gulp.dest("dist/img"));
});

gulp.task('fonts', function(){
   return gulp.src("src/fonts/**/*")
               .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function(){
   return gulp.src("src/icons/**/*")
               .pipe(imagemin())
               .pipe(gulp.dest("dist/icons"));
});

gulp.task('js', function(){
   return gulp.src("src/js/**/*.js")
               .pipe(gulp.dest("dist/js"));
});

gulp.task('mailer', function(){
   return gulp.src("src/mailer/**/*")
               .pipe(gulp.dest("dist/mailer"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'mailer', 'js', 'icons', 'fonts', 'img', 'html'));