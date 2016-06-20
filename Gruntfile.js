/*
 *  date		- 20160222
 *  author	- jr
 *
 * */

module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
	
	grunt.initConfig({
		
		// Project configuration
		pkg: grunt.file.readJSON('package.json'),
		
		clean: ['concat'],
		
		// to combine file
		concat: {
			libs: {
				options: {
					separator: ';\n\n'
				},
				src: ['asset/js/libs/*.js'],
				dest: 'asset/js/libs.js',
			},
			/*vendors: {
				src: ['js/vendors/*.js'],
				dest: 'js/script.js',
			}*/
		},
		
		// to minify js's file
		uglify: {
			options:{
				mangle:false,
				//sourceMap: true,
			},
			/*libs: {
				src: ['assetjs/libs.js'],
				dest: 'assetjs/libs.min.js',
			},*/
			suncream: {
				src: ['asset/js/suncream.js'],
				dest: 'asset/js/suncream.min.js',
			},
			/*vendors: {
				src: ['js/vendors/vendors.js'],
				dest: 'js/vendors.min.js',
			},*/
		},
		
		// Sass complies into Css
		sass: {
			dist: {
				options: {
					sourceMap: true,
					outputStyle: 'expanded'   // Values: nested, expanded, compact, compressed
				},
				files: {
					'asset/css/suncream/suncream.css': 'asset/sass/suncream.scss',
					'asset/css/suncream/docs.css': 'asset/sass/docs.scss',
					'asset/css/themes/sc-th.css': 'asset/sass/themes/sc-th/style.scss',  // theme
				}
			},
			minfy: {
				options: {
					sourceMap: true,
					outputStyle: 'compressed'   // Values: nested, expanded, compact, compressed
				},
				files: {
					'asset/css/suncream/suncream.min.css': 'asset/sass/suncream.scss',
					'asset/css/suncream/docs.min.css': 'asset/sass/docs.scss',
					'asset/css/themes/sc-th.min.css': 'asset/sass/themes/sc-th/style.scss',  // theme
				}
			}
		},
		
		
		// Cssmin
	    cssmin: {
			 options: {
				 sourceMap: true,
				 shorthandCompacting: false,
				 roundingPrecision: -1
			 },
			 target: {
				 files: {
					 'asset/css/suncream/suncream.min.css': ['asset/css/suncream/suncream.css'],
					 'asset/css/suncream/docs.min.css': ['asset/css/suncream/docs.css'],
					 'asset/css/themes/sc-th.min.css': ['asset/css/themes/sc-th.css'],   // theme minify
				 }
			 }
	    },
		
		// Watch and build
	    watch: {
	      css: {
	        files: ['asset/sass/**/*.scss'],
	        tasks: ['sass'],
	        options:{
	        	spawn:false,
		    	livereload:true,
		      }
	      }
	    },

	});
	
	// Default task(s)
	grunt.registerTask('default', [
	                               //'concat',
	                               //'uglify',
	                               'sass',
	                               //'cssmin',
	                               //'watch'
     ]);
	
};