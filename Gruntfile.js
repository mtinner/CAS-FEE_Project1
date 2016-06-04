module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            clean: [
                'dist'
            ]
        },
        copy: {
            tmp: {
                files: [
                    {
                        expand: true,
                        cwd: './node_modules/jquery/dist',
                        src: './jquery.js',
                        dest: './dist/tmp/vendor',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: './node_modules/handlebars/dist',
                        src: './handlebars.js',
                        dest: './dist/tmp/vendor',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: './node_modules/font-awesome/fonts',
                        src: './*',
                        dest: './dist/fonts',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: './node_modules/open-sans-fontface/fonts',
                        src: '**/*',
                        dest: './dist/fonts',
                        filter: 'isFile'
                    }
                ]
            },
            main: {
                expand: true,
                cwd: './app',
                src: './*.html',
                dest: './dist/app',
                filter: 'isFile'
            },
            views: {
                expand: true,
                cwd: './app/src/views',
                src: './*.html',
                dest: './dist/app/views',
                filter: 'isFile'
            }
        },
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
                src: ['./dist/tmp/vendor/*.js'],
                dest: './dist/app/vendor.concat.js'
            }
        },
        sass: {
            dist: {
                options: {
                    includePaths: ['/app/styles/layout']
                },
                files: {
                    'dist/app/main.css': 'app/styles/all.scss'
                }
            }
        },
        express: {
            dev: {
                options: {
                    script: './backend/server.js'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            all: {
                files: ['app/**'],
                tasks: [
                    'clean',
                    'copy:tmp',
                    'copy:main',
                    'copy:views',
                    'concat',
                    'sass',
                    'browserify',
                    'eslint'
                ]
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [['babelify', { presets: ['es2015'] }]]
                },
                src: ['app/src/scripts/**/*.js'],
                dest: 'dist/app/main.bundle.js'
            }
        },
        eslint: {
            target: ['app/src/**/*.js', '*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', [
        'clean',
        'copy:tmp',
        'copy:main',
        'copy:views',
        'concat',
        'sass',
        'browserify',
        'express',
        'eslint',
        'watch:all'
    ]);
};