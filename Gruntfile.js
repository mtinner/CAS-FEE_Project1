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
        }
    });



    grunt.loadNpmTasks('main-bower-files');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['clean','bower','concat']);

};