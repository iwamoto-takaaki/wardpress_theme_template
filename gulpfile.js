const { src, dest, series, parallel, watch } = require('gulp');
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
var rename = require('gulp-rename');

const distDir = "./dist/";
const srcDir = "./src/";

pugSrc = srcDir + '**/*.*'
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

exports.pugToPhp = parallel(pugToPhp)

exports.watch = parallel(function() {
	watch([srcDir], function(cp) {
		console.log('watcher running');
		this.pugToPhp();
		cp();
	}); 
});
