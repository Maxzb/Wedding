let project_folder = require('path').basename(__dirname); /* Название папки для build-версии */
let source_folder = 'src';

let fs = require('fs');

let path = {
   build: {
      html: project_folder + '/',
      css: project_folder + '/css/',
      js: project_folder + '/js/',
      images: project_folder + '/images/',
      video: project_folder + '/video/',
      fonts: project_folder + '/fonts/'
   },
   src: {
      html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
      css: [source_folder + '/scss/*.scss', '!' + source_folder + '/_*.scss'],
      js: source_folder + '/js/script.js',
      images: [source_folder + '/images/**/*.{jpg,png,svg,gif,ico,webp}', '!' + source_folder + '/images/**/_**/*'],
      video: source_folder + '/video/**/*',
      fonts: source_folder + '/fonts/**/*'
   },
   watch: {
      html: source_folder + '/**/*.html',
      css: source_folder + '/scss/**/*.scss',
      js: source_folder + '/js/**/*.js',
      images: source_folder + '/images/**/*.{jpg,png,svg,gif,ico,webp}',
      video: source_folder + '/video/**/*.mp4',
   },
   clean: './' + project_folder + '/'
}

let {
   src,
   dest
} = require('gulp'),
   gulp = require('gulp'),
   browsersync = require('browser-sync').create(),
   fileinclude = require('gulp-file-include'), /* соединяет отдельные файлы .html (header.html, footer.html etc.) через @@include('_header.html') */
   del = require('del'),
   sourcemaps = require('gulp-sourcemaps'),
   scss = require('gulp-sass'),
   autoprefixer = require('gulp-autoprefixer'),
   rename = require('gulp-rename'),
   concat = require('gulp-concat'),
   clean_css = require('gulp-clean-css'),
   uglify = require('gulp-uglify-es').default,
   imagemin = require('gulp-imagemin'),
   webp = require('gulp-webp'),
   webphtml = require('gulp-webp-html'),
   ttf2woff = require('gulp-ttf2woff'),
   ttf2woff2 = require('gulp-ttf2woff2'),
   otf2ttf = require('gulp-fonter'),
   babel = require('gulp-babel'),
   gulpStylelint = require('gulp-stylelint');

function browserSync(params) {
   browsersync.init({
      server: {
         baseDir: './' + project_folder + '/'
      },
      port: 3000,
      notify: false,
      online: true,
      /* tunnel: true
      logLevel: "debug" */
   })
}

function html() {
   return src(path.src.html)
      .pipe(fileinclude())
      .pipe(webphtml())
      .pipe(dest(path.build.html))
      .pipe(browsersync.stream())
}

function css() {
   return src(path.src.css)
      .pipe(sourcemaps.init())
      .pipe(gulpStylelint({
         reporters: [{
            formatter: 'string',
            console: true
         }]
      }))
      .pipe(
         scss({
            outputStyle: 'expanded' /* compressed-сжатый*/
         })
      )
      .pipe(
         autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
         })
      )
      .pipe(dest(path.build.css))
      .pipe(clean_css())
      .pipe(rename({
         suffix: '.min'
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
}

function js() {
   return src(path.src.js)
      .pipe(fileinclude())
      .pipe(dest(path.build.js))
      .pipe(uglify())
      .pipe(rename({
         suffix: '.min'
      }))
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream())
}

function es5() {
   return src(path.src.js)
      .pipe(fileinclude())
      .pipe(babel({
         presets: ['@babel/env']
      }))
      .pipe(rename({
         suffix: '.es5'
      }))
      .pipe(dest(path.build.js))
      .pipe(uglify())
      .pipe(rename({
         suffix: '.min'
      }))
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream())
}

function images() {
   return src(path.src.images)
      .pipe(
         webp({
            quality: 70
         })
      )
      .pipe(dest(path.build.images))
      .pipe(src(path.src.images))
      .pipe(
         imagemin({
            progressive: true,
            svgoPlugins: [{
               removeViewBox: false
            }],
            interlaced: true,
            optimizationLevel: 3
         })
      )
      .pipe(dest(path.build.images))
      .pipe(browsersync.stream())
}

function video() {
   return src(path.src.video)
      .pipe(dest(path.build.video))
}

/* Этот таск для преобразования шрифтов .otf в .ttf в исходной папке, для последующего преобразования созданного .ttf в .woff через главный task. 
!ЗАПУСКАЕТСЯ ОТДЕЛЬНО! */
gulp.task('otf2ttf', function () {
   return src([source_folder + '/fonts/*.otf'])
      .pipe(fonter({
         formats: ['ttf']
      }))
      .pipe(dest(source_folder + '/fonts/'));
})
/* -------------------------------------------------- */

function fonts() {
   src(path.src.fonts)
      .pipe(ttf2woff())
      .pipe(dest(path.build.fonts))
   return src(path.src.fonts)
      .pipe(ttf2woff2())
      .pipe(dest(path.build.fonts))
}

// 
function fontsStyle(params) {
   let file_content = fs.readFileSync(source_folder + '/scss/_fonts.scss');
   if (file_content == '') {
      fs.writeFile(source_folder + '/scss/_fonts.scss', '', cb);
      return fs.readdir(path.build.fonts, function (err, items) {
         if (items) {
            let c_fontname;
            for (var i = 0; i < items.length; i++) {
               let fontname = items[i].split('.');
               fontname = fontname[0];
               if (c_fontname != fontname) {
                  fs.appendFile(source_folder + '/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
               }
               c_fontname = fontname;
            }
         }
      })
   }
}

function cb() {}

function watchFiles(params) {
   gulp.watch([path.watch.html], html);
   gulp.watch([path.watch.css], css);
   gulp.watch([path.watch.js], js);
   gulp.watch([path.watch.js], es5);
   gulp.watch([path.watch.images], images);
}

function clean(params) {
   return del(path.clean);
}

/* Создание файлов с библиотеками доп.модулей типа слайдеров и т.д. ОТКЛЮЧЕН!!! */

/* function libscss(){
   return gulp.src([
   'node_modules/slick-carousel/slick/slick.css'
   ])
   .pipe(concat('_libs.scss'))
   .pipe(gulp.dest('src/scss'))
}
function libsjs(){
   return gulp.src([
   'node_modules/slick-carousel/slick/slick.js'
   ])
   .pipe(concat('libs.min.js'))
   .pipe(uglify())
   .pipe(dest(path.build.js))
}
let libs = gulp.series(libscss, libsjs); */
/* ---------------------------------------------------------------------------------------------------------- */

let build = gulp.series(clean, gulp.parallel(es5, js, css, html, images, video, fonts), fontsStyle); /* libs УБРАЛ! */
let watch = gulp.parallel(build, watchFiles, browserSync);

/* exports.libs = libs; */
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.video = video;
exports.js = js;
exports.es5 = es5;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;