module.exports = function(grunt) {

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
                    paths  :'.'
                }
            }
        },
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
                src: ['tmp/vendor/angular/angular.js','tmp/vendor/angular-route/angular-route.js'],
                dest: 'resources/scripts/vendor.js'
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
            scripts: {
                files: ['**/*.js'],
                options: {
                    livereload: true
                }
            }
        }
    });



    grunt.loadNpmTasks('main-bower-files');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean','bower','concat','express','watch']);

};