'use strict';

module.exports = function($options, $done) {
  if (process.env.PLUMES && process.env.PLUMES == 'false') {
    return $done();
  }

  if ($options && $options.owner && $options.owner == 'gulp') {
    process.env.GULP_START = 'false';
  }

  $done();
};
