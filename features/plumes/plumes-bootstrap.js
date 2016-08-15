'use strict';

module.exports = ['$options', '$done', function($options, $done) {
  if ($options && $options.owner && $options.owner == 'gulp') {
    process.env.START_GULP = 'false';
  }

  $done();
}];
