// Node modules
var fs = require('fs'), vm = require('vm'), merge = require('deeply'), chalk = require('chalk'), es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'), rjs = require('gulp-requirejs-bundler'), concat = require('gulp-concat'), clean = require('gulp-clean'),
    replace = require('gulp-replace'), uglify = require('gulp-uglify'), htmlreplace = require('gulp-html-replace'), typescript = require('gulp-tsc')
	sass = require('gulp-sass'), browserSync = require('browser-sync').create(), rename = require('gulp-rename'), del = require('del');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'bower_modules/requirejs/require'
        },
        include: [
            'requireLib',
            'components/nav-bar/nav-bar',
            'components/home-page/home',
			'components/project-page/project-page',
            'text!components/about-page/about.html'
        ],
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
        }
    });

// Compile all .ts files, producing .js and source map files alongside them
gulp.task('ts', function() {
    return gulp.src(['!src/bower_modules/**/*.ts',
					 '!node_modules/**/*.ts',
					 '**/*.ts'])
        .pipe(typescript({
            module: 'amd',
            sourcemap: true,
            outDir: './'
        }))
        .pipe(gulp.dest('./'));
});

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', ['ts'], function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', ['sass'], function () {
    var bowerCss = gulp.src('src/css/bootstrap-override.min.css') //'src/bower_modules/components-bootstrap/css/bootstrap.min.css'
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src('src/css/*.css'),
        combinedCss = es.concat(bowerCss, appCss).pipe(concat('css.css')),
        fontFiles = gulp.src('./src/bower_modules/components-bootstrap/fonts/*', { base: './src/bower_modules/components-bootstrap/' });
    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', ['sass-clean'], function() {
	return gulp.src('src/sass/*.scss')
		.pipe(sass())
		.pipe(rename(function (path) {
			path.basename += "-generated";
			path.extname = ".css";
		}))
		.pipe(gulp.dest('src/css'));
});

gulp.task('sass-clean', function(){
	return del(['src/**/*-generated.css']);
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

// Removes all files from ./dist/, and the .js/.js.map files compiled from .ts
gulp.task('clean', function() {
    var distContents = gulp.src('./dist/**/*', { read: false }),
        generatedJs = gulp.src(['src/**/*.js', 'src/**/*.js.map', 'test/**/*.js', 'test/**/*.js.map'], { read: false })
            .pipe(es.mapSync(function(data) {
                // Include only the .js/.js.map files that correspond to a .ts file
                return fs.existsSync(data.path.replace(/\.js(\.map)?$/, '.ts')) ? data : undefined;
            }));
    return es.merge(distContents, generatedJs).pipe(clean());
});

gulp.task('serve', ['default'], function() {
	browserSync.init({
        server: "./dist"
    });

	// gulp.watch(["src/**/*.ts",
				// "src/**/*.scss",
				// "src/**/*.html"], ['default']).on('change', browserSync.reload);
    // gulp.watch("src/sass/*.scss", ['css']).on('change', browserSync.reload);
    // gulp.watch("src/**/*.html", ['html', 'js']).on('change', browserSync.reload);
});

gulp.task('default', ['html', 'js', 'css'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
