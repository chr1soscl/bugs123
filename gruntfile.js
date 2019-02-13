module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-war');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        war:{
            target: {
                options: {
                    war_dist_folder: 'deployments',
                    war_name: 'bugs123'
                },
                files:[
                    {
                        expand: true,
                        cwd: './dist/bugs123/',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        }
    });
    grunt.registerTask('default',['war']);
};