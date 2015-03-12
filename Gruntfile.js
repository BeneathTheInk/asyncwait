module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [ "dist/*.js" ],
		browserify: {
			dist: {
				src: "index.js",
				dest: "dist/asyncwait.js",
				options: {
					browserifyOptions: { standalone: "asyncWait" }
				}
			},
			dev: {
				src: "index.js",
				dest: "dist/asyncwait.dev.js",
				options: {
					browserifyOptions: { debug: true, standalone: "asyncWait" }
				}
			},
			test: {
				src: "test/*.js",
				dest: "dist/asyncwait.test.js",
				options: {
					browserifyOptions: { debug: true }
				}
			}
		},
		wrap2000: {
			dist: {
				src: 'dist/asyncwait.js',
				dest: 'dist/asyncwait.js',
				options: {
					header: "/*\n * Async Wait\n * (c) 2015 Beneath the Ink, Inc.\n * MIT License\n * Version <%= pkg.version %>\n */\n"
				}
			},
			dev: {
				src: 'dist/asyncwait.dev.js',
				dest: 'dist/asyncwait.dev.js',
				options: {
					header: "/*\n * Async Wait (With Source Map)\n * (c) 2015 Beneath the Ink, Inc.\n * MIT License\n * Version <%= pkg.version %>\n */\n"
				}
			},
			test: {
				src: 'dist/asyncwait.test.js',
				dest: 'dist/asyncwait.test.js',
				options: {
					header: "/*\n * Async Wait Tests\n * (c) 2015 Beneath the Ink, Inc.\n * MIT License\n * Version <%= pkg.version %>\n */\n"
				}
			}
		},
		uglify: {
			dist: {
				src: "dist/asyncwait.js",
				dest: "dist/asyncwait.min.js"
			}
		},
		watch: {
			test: {
				files: [ "src/**/*.js", "test/*.js" ],
				tasks: [ 'test' ],
				options: { spawn: false }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-wrap2000');

	grunt.registerTask('build-dev', [ 'browserify:dev', 'wrap2000:dev' ]);
	grunt.registerTask('build-test', [ 'browserify:test', 'wrap2000:test' ]);
	grunt.registerTask('build-dist', [ 'browserify:dist', 'wrap2000:dist', 'uglify:dist' ]);

	grunt.registerTask('dev', [ 'clean', 'build-dev' ]);
	grunt.registerTask('test', [ 'clean', 'build-test' ]);
	grunt.registerTask('dist', [ 'clean', 'build-dist' ]);

	grunt.registerTask('default', [ 'clean', 'build-dist', 'build-dev' ]);

}