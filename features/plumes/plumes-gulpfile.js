'use strict';

module.exports = function($gulp) {
  if (process.env.PLUMES && process.env.PLUMES == 'false') {
    return null;
  }

  $gulp.task('plumes', function(done) {
    $gulp.src('node_modules/plumes/public/**')
      .pipe($gulp.dest('./public/vendor/plumes/'))
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
          .pipe($gulp.dest('./public/vendor'))
          .on('end', done);
      });
  });

  return {
    task: 'plumes',
    after: ['$gulp', '$watch', '$default', function($gulp, $watch, $default) {
      var Plumes = require('plumes');

      new Plumes($gulp, {
        path: {
          less: './features/**/views/css/*.less',
          js: './features/**/views/*.js',
          html: './features/**/views/html/*.html',
          public: './public'
        },
        default: $default,
        watcher: process.env.GULP_WATCHER && process.env.GULP_WATCHER == 'true',
        watchs: $watch
      });
    }]
  };
};
