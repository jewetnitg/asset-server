var path = require('path');
var shell = require('./helpers/shell');
var serverConfig = require('../server.config');

// this task builds the static assets, it really builds a (git) submodule
module.exports = function (gulp) {
  var tempDir = '.asset-server-tmp';
  var srcDstPath = path.join(tempDir, serverConfig.remote.dstDir);
  var nodeModulesPath = path.join(tempDir, 'node_modules');
  var gulpfilePath = path.join(tempDir, serverConfig.remote.gulpFile);

  var rmrf = 'rm -rf ';
  var gitInTempDir = 'git -C ' + tempDir + ' ';

  gulp.task('assets', function (done) {
    shell.series([
      // prepare filesystem
      rmrf + serverConfig.dst,
      rmrf + nodeModulesPath,
      rmrf + tempDir,
      'mkdir ' + tempDir,

      // pull the submodule
      'git clone ' + serverConfig.remote.url + ' ' + tempDir,
      gitInTempDir + 'checkout ' + serverConfig.remote.branch,
      gitInTempDir + 'pull ' + serverConfig.remote.name + ' ' + serverConfig.remote.branch,
      gitInTempDir + 'submodule update --init --recursive',

      // npm install the submodule
      'npm i --prefix ' + tempDir,

      // run the submodules build
      'gulp --gulpfile ' + gulpfilePath + ' ' + serverConfig.remote.gulpTask,

      // move the build to its destination
      'mv ' + srcDstPath + ' ' + serverConfig.dst,

      // clean up filesystem
      rmrf + tempDir

    ], done);
  });

};

