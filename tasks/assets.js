var shell = require('gulp-shell');

module.exports = function (gulp) {
  gulp.task('assets', shell.task([
      'cd ./src && git pull origin && rm -rf node_modules && npm i && npm run build:prod',
      'cp ./src/dst ./assets'
    ])
  );

};
