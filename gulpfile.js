const { src, dest, series, parallel, watch } = require('gulp');
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const assets = "./assets/";
const srcDir = "./src/";

pugSrc = srcDir + '*.php.pug';
pugToPhp = function () {
	return src(pugSrc)
        .pipe(pug({
            basedir: srcDir,
            pretty: true
        }))
        .pipe(rename({
            extname: ''
		}))
        .pipe(dest('.'))
};

exports.pugToPhp = parallel(pugToPhp);

sassSrcDir = srcDir + '/sass/**/*.sass';
cssDistDir = assets + 'css/';

sassToCss = function () {
	return src(sassSrcDir)
		.pipe(
			sass({
				outputStyle: 'expanded', 
				includePaths: './node_modules/bootstrap/scss'
			})
			.on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(dest(cssDistDir));
};

exports.sassToCss = parallel(sassToCss);

exports.watch = parallel(function() {
	watch([srcDir], function(cp) {
		this.pugToPhp();
		this.sassToCss();
		cp();
	}); 
});
