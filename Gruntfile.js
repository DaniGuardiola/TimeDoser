"use strict";
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        clean: {
            build: {
                src: ["bin/"]
            }
        },
        terser: {
            background: {
                src: "src/js/background.js",
                dest: "bin/js/background.js"
            },
            timer: {
                src: "bin/view/timer.js",
                dest: "bin/view/timer.js"
            }
        },
        cssmin: {
            style: {
                files: [{
                    expand: true,
                    cwd: "src/css",
                    src: ["**/*.css"],
                    dest: "bin/css",
                    ext: ".css"
                }]
            }
        },
        copy: {
            manifest: {
                src: "src/manifest.json",
                dest: "bin/manifest.json"
            },
            meta: {
                expand: true,
                cwd: "resources/meta",
                src: "**",
                dest: "bin/meta/"
            },
            audio: {
                expand: true,
                cwd: "resources/audio",
                src: "**",
                dest: "bin/audio/"
            },
            locales: {
                expand: true,
                cwd: "_locales",
                src: "**",
                dest: "bin/_locales"
            },
            fonts: {
                src: "src/bower_components/font-roboto/fonts/roboto/Roboto-Regular.ttf",
                dest: "bin/bower_components/font-roboto/fonts/roboto/Roboto-Regular.ttf"
            },

            view: {
                expand: true,
                cwd: "src/view",
                src: "**",
                dest: "bin/view/"
            }
        },
        exec: {

            bundler: {
                command: "polymer-bundler -r \"src/\" /view/timer.html --inline-scripts --inline-css | crisper --html bin/view/timer.html --js bin/view/timer.js"
            }
            
        },
        "json-minify": {
            manifest: {
                files: "bin/manifest.json"
            }
        },
        minifyHtml: {
            options: {
                empty: true
            },
            timer: {
                files: {
                    "bin/view/timer.html": "bin/view/timer.html"
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-terser");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-json-minify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-minify-html");
    
    // Default task.
    grunt.registerTask("default", ["build"]);

    grunt.registerTask("build", [
        "clean:build",
        "terser:background",
        "copy:manifest",
        "copy:audio",
        "copy:fonts",
        "copy:meta",
        "copy:locales",
        "copy:view", // it's little hack to create directory bin/view
        "exec:bundler",
        "minifyHtml:timer",
        "terser:timer",
        "json-minify:manifest"
    ]);
};
