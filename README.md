#Gulp Global Exclude


Add exclude patterns to gulp that will be used in every .src and .watch call.

Usage:

    var gulp = require('gulp');
    var globalExclude = require('gulp-global-exclude');
    
    globalExclude(gulp, ['!node_modules/**', '!build/**']);
    

Now '!node_modules/**' and '!build/**' will automatically be appended to the
patterns array in any ```.src``` or ```.watch``` call.
