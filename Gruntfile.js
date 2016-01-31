module.exports = function(grunt) {
    // task config
    grunt.initConfig({
        jshint: {
            backend: ['server/**/*.js'],
            frontend: ['public/js/**/*.js']
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // register tasks
    grunt.registerTask('default', ['jshint']);
};
