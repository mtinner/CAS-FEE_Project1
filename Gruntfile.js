module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            clean: [
                './dist/app',
                './dist/tmp'
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
                src: ['./dist/tmp/vendor/jquery.js'],
                dest: './dist/app/vendor.concat.js'
            }
        },
        sass: {
            dist: {
                options: {
                    includePaths: ['/app/styles/layout']
                },
                files: {
                    './dist/app/main.css': './app/styles/all.scss'
                }
            }
        },
        replace: {
            css: {
                options: {
                    usePrefix: false,
                    patterns: [
                        {
                            match: '*/',
                            replacement: '*/\n'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, cwd: './dist/app', src: ['./main.css'], dest: './dist/app'}
                ]
            }
        },
        postcss: {
            options: {
                processors: [
                    require('mdcss')({
                        theme: require('mdcss-theme-github'),
                        destination: './dist/styleguide'
                    })
                ]
            },
            dist: {
                src: './dist/app/**/*.css'
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
            all: {
                files: ['app/**'],
                tasks: [
                    'clean',
                    'copy:tmp',
                    'copy:main',
                    'copy:views',
                    'concat',
                    'sass',
                    'replace:css',
                    'browserify',
                    'eslint'
                ]
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [['babelify', {presets: ['es2015']}]]
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
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-postcss');


    grunt.registerTask('default', [
        'clean',
        'copy:tmp',
        'copy:main',
        'copy:views',
        'concat',
        'sass',
        'replace:css',
        'postcss',
        'browserify',
        'express',
        'eslint',
        'watch:all'
    ]);
};