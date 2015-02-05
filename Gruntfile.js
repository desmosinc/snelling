module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({

        // Copy all the necessary client-side stuff into a build/ folder
        copy: {
            build: {
                files: [
                    {expand: true, src: 'public/css/*', dest: 'build/css', flatten: true},
                    {expand: true, src: 'public/js/*', dest: 'build/js', flatten: true},
                    {expand: true, src: 'public/images/*', dest: 'build/images', flatten: true},
                    {expand: true, src: 'public/vendor/bootstrap/dist/css/bootstrap.min.css', dest: 'build/vendor/bootstrap/dist/css', flatten: true},
                    {expand: true, src: 'public/vendor/bootstrap/dist/js/bootstrap.min.js', dest: 'build/vendor/bootstrap/dist/js', flatten: true},
                    {expand: true, src: 'public/vendor/bootstrap/dist/fonts/*', dest: 'build/vendor/bootstrap/dist/fonts', flatten: true},
                    {expand: true, src: 'public/vendor/gifshot/gifshot.custom.min.js', dest: 'build/vendor/gifshot', flatten: true}
                ]
            },
            moveAbout: {
                options: {
                    processName: function(filename) {
                        return 'about.html';
                    }
                },
                files: {
                    'build/about/index.html': 'build/about.html'
                }
            }
        },

        // Remove the old build/ folder
        clean: {
            build: {
                src: ['build']
            },
            cleanAbout: {
                src: ['build/about.html']
            }
        },

        // Minify CSS
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css'
                }]
            }
        },

        // Minify JS
        uglify: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'build/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'build/js'
                }]
            }
        },

        // Compile Jade views
        jade: {
            compile: {
                options: {
                    data: {}
                },
                files: [{
                    expand: true,
                    cwd: 'views',
                    src: ['**/*.jade', '!layout.jade', '!partials/*'],
                    dest: 'build',
                    ext: '.html'
                }]
            }
        },

        // Start the static dev server
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'build',
                    hostname: '*'
                }
            }
        },

        // An empty task just to keep the server alive until you kill it manually
        watch: {}

    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Define tasks
    grunt.registerTask(
        'build',
        'Compile everything into a build directory for static hosting.',
        ['clean:build', 'copy:build', 'cssmin', 'uglify', 'jade', 'copy:moveAbout', 'clean:cleanAbout']
    );

    grunt.registerTask(
        'server',
        'Run the dev server on port 3000.',
        ['connect', 'watch']
    );

    grunt.registerTask(
        'default',
        'Run a build and start the dev server.',
        ['build', 'connect', 'watch']
    );

};