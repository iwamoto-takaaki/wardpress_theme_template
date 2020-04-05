const { src, dest, series, parallel, watch } = require('gulp');
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const distDir = "./dist/";
const srcDir = "./src/";

pugSrc = srcDir + '**/*.*';
pugToPhp = function () {
	return src(srcDir + '**/*.php.pug')
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

sassSrcDir = srcDir + '**/*.sass';
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

exports.watch = parallel(function() {
	watch([srcDir], function(cp) {
		this.pugToPhp();
		this.sassToCss();
		cp();
	}); 
});
