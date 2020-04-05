const { src, dest, series, parallel, watch } = require('gulp');
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const distDir = "./dist/";
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
        .pipe(dest(distDir))
};

exports.pugToPhp = parallel(pugToPhp);

sassSrcDir = srcDir + '/sass/**/*.sass';
cssDistDir = distDir + 'css/';

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


copyImages = function() {
	return src([srcDir + 'images/*'])
		.pipe(dest(distDir + 'images/'));
};
exports.copyImages = parallel(copyImages);

copyJs = function() {
	return src([srcDir + 'js/*'])
		.pipe(dest(distDir + 'js/'));
};
exports.copyJs = parallel(copyJs);

exports.watch = parallel(function() {
	watch([srcDir], function(cp) {
		this.copyImages();
		this.copyJs();
		this.pugToPhp();
		this.sassToCss();
		cp();
	}); 
});
