module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            clean: ["tmp"]
        },
        bower: {
            dev: {
                base: 'bower_components', /* the path to the bower_components directory */
                dest: 'tmp/vendor',
                options: {
                    checkExistence: true,
                    paths: '.'
                }
            }
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
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            scripts: {
                files: ['**/*.js', '**/*.css'],
                options: {
                    livereload: true
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'app/bundle.js': 'app/app.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('main-bower-files');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'clean',
        'bower',
        'concat',
        'sass',
        'babel',
        'express',
        'watch'
    ]);
};