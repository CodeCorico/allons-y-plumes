'use strict';

module.exports = function($gulp) {
  if (process.env.PLUMES && process.env.PLUMES == 'false') {
    return null;
  }

  $gulp.task('plumes', function(done) {
    $gulp.src('node_modules/plumes/public/**')
      .pipe($gulp.dist('vendor/plumes'))
      .on('end', function() {

        $gulp.src([
          'node_modules/jquery/dist/jquery.js',
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/jquery/dist/jquery.min.map',
          'node_modules/ractive/ractive.js',
          'node_modules/ractive/ractive.js.map',
          'node_modules/ractive/ractive.min.js',
          'node_modules/ractive/ractive.min.js.map',
          'node_modules/ractive-require/dist/*'
        ])
          .pipe($gulp.dist('vendor'))
          .on('end', done);
      });
  });

  return {
    tasks: 'plumes',
    after: function($allonsy, $gulp, $watchs, $lessPaths, $lessPlugins, $default) {
      var Plumes = require('plumes');

      $allonsy.log('allons-y-plumes', 'plumes-start');

      $gulp.defaultTasksCount += 4;

      new Plumes($gulp, {
        path: {
          less: $allonsy.globPatterns('views/css/*.less'),
          js: $allonsy.globPatterns('views/*.js'),
          html: $allonsy.globPatterns('views/html/*.html'),
          resources: $allonsy.globPatterns('views/resources'),
          public: $gulp.dist
        },
        default: $default,
        lessPaths: $lessPaths,
        lessPlugins: $lessPlugins,
        watcher: process.env.GULP_WATCHER && process.env.GULP_WATCHER == 'true',
        watchs: $watchs
      });
    }
  };
};
