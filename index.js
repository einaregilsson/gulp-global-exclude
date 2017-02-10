/*
  Gulp Global Exclude

  Add exclude patterns to gulp that will be used in every .src and .watch call.

  Usage:

  var gulp = require('gulp');
  var globalExclude = require('gulp-global-exclude');

  globalExclude(gulp, ['!node_modules/**', '!build/**']);

  Now '!node_modules/**' and '!build/**' will automatically be appended to the
  patterns array in any .src or .watch call.
*/

function exclude(gulp, patterns) {
    checkArguments(gulp, patterns);

    if (typeof patterns == 'string') {
        patterns = [patterns];
    }

    var oldSrc = gulp.src;
    var oldWatch = gulp.watch;

    gulp.src = function(globs, options, p3,p4,p5) { //Just add some extra options if .src or .watch ever add extra arguments...
        if (typeof globs == 'string') {
            globs = [globs];
        }

        return oldSrc.call(this, patterns.concat(globs), options, p3,p4,p5);
    };

    gulp.watch = function(globs, options, fn, p3,p4,p5) {
        if (typeof globs == 'string') {
            globs = [globs];
        }

        return oldWatch.call(this, patterns.concat(globs), options, fn, p3,p4,p5);
    };
}

function checkArguments(gulp, patterns) {
    if (!gulp || !gulp.src || !gulp.watch) {
        throw new TypeError('First argument must be gulp instance');
    }
    if (typeof patterns !== 'string' && !Array.isArray(patterns)) {
        throw new TypeError('patterns must be either string or array.')
    }

    for (var i=0; i < patterns.length; i++) {
        if (patterns[i].charAt(0) != '!') {
            throw new Error('Pattern "' + patterns[i] + '" is illegal. All patterns should be exclude patterns and start with !');
        }
    }
}


module.exports = exclude;