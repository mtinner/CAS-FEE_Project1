module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            clean: ['tmp', 'app/bundle.js*']
        },
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
                src: ['tmp/vendor/angular/angular.js', 'tmp/vendor/angular-route/angular-route.js'],
                dest: 'resources/scripts/vendor.js'
            }
        },
        sass: {
            dist: {
                options: {
                    includePaths: ['/app/styles/layout']
                },
                files: {
                    'app/resources/styles/main.css': 'app/styles/all.scss'
                }
            }
        },
        express: {
            dev: {
                options: {
                    script: './server.js'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            scripts: {
                files: ['app/src/**/*.js'],
                tasks: ['eslint', 'browserify']
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [['babelify', {presets: ['es2015']}]]
                },
                src: ['app/src/main.js'],
                dest: 'app/bundle.js'
            }
        },
        eslint: {
            target: ['app/src/**/*.js', '*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', [
        'clean',
        'concat',
        'sass',
        'browserify',
        'express',
        'eslint',
        'watch'
    ]);
};