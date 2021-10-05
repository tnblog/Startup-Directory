// 分割代入、srcとdistの変数を作成ファイル内で使えるようにする。
const {
  src,
  dest,
  watch,
  series,
  parallel
} = require('gulp');

// gulp-load-pluginsを使ってプラグインの読み込みを簡素化
// ⇒ $.プラグイン名で読み込みが可能になる。
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
const pkg = require('./package.json');
const config = pkg["gulp-config"];
const sizes = config.sizes;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("autoprefixer");
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const browserSync = require("browser-sync");
const server = browserSync.create();
const isProd = process.env.NODE_ENV === "production";


// 操作対象のファイルを指定
// ⇒ 配列指定：['index.html', 'sub.html'],
// ⇒ ワイルドカード指定：'./src/*', './src/**/*'
// ⇒ 拡張子を指定することで一部のファイルだけ出力できる

function icon(done) {
  for (let size of sizes) {
    let width = size[0];
    let height = size[1];
    src('./src/assets/images/icon/favicon.png')
      .pipe($.imageResize({
        width,
        height,
        crop: true,
        upscale: false
      }))
      .pipe($.imagemin())
      .pipe($.rename(`favicon-${width}x${height}.png`))
      .pipe(dest('./dist/assets/images/icon'));
  }
  done();
}

function images() {
  return src('./src/assets/images/**')
    .pipe(changed('./dist/assets/images/'))
    .pipe($.imagemin([
      pngquant({
        quality: [.60, .70],
        speed: 1
      }),
      mozjpeg({
        quality: 65
      }),
      imagemin.svgo(),
      imagemin.optipng(),
      imagemin.gifsicle({
        optimizationLevel: 3
      })
    ]))
    .pipe(dest('./dist/assets/images/'));
}

function styles() {
  return src('./src/assets/styles/main.scss')
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe(sass())
    .pipe($.postcss([
      autoprefixer({
        overrideBrowserslist: ["last 2 versions", "ie >= 10", "Android >= 5"],
        cascade: false
      })
    ]))
    .pipe($.if(!isProd, $.sourcemaps.write('.')))
    .pipe(dest('./dist/assets/styles/'));
}

function scripts() {
  return src('./src/assets/scripts/*.js')
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(!isProd, $.sourcemaps.write('.')))
    .pipe(dest('./dist/assets/scripts/'));
}

function startAppServer() {
  server.init({
    // port : 80,                     // browsersyncサーバが使うポート番号を変更できる
    // proxy : "develop.wp/",     // ローカルにある「Site Domain」に合わせる
    // notify: false,                 // ブラウザ更新時に出てくる通知を非表示にする
    // open: "external",              // ローカルIPアドレスでサーバを立ち上げる
    server: {
      baseDir: './dist'
    }
  });

  watch('./src/assets/**/*.scss', styles);
  watch('./src/assets/**/*.js', scripts);
  watch('./src/assets/**/*.scss').on('change', server.reload);
  watch('./src/assets/**/*.js').on('change', server.reload);
  watch("./**/*.php").on('change', server.reload);
}

const serve = series(parallel(styles, series(scripts)), startAppServer);

exports.icon = icon;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.serve = serve;
