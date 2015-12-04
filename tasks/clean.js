var del = require('del');

module.exports = function (gulp) {
  gulp.task('clean', function (cb) {
    return del('build', cb);
  });
};
