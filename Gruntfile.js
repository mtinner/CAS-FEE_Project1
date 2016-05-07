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
        }
    });



    grunt.loadNpmTasks('main-bower-files');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean','bower']);

};