var path = require('path');
var shell = require('./helpers/shell');
var serverConfig = require('../server.config');

// this task builds the static assets, it really builds a (git) submodule
module.exports = function (gulp) {
  var nodeModulesPath = path.join(serverConfig.remote.dir, 'node_modules');
  var gulpfilePath = path.join(serverConfig.remote.dir, serverConfig.remote.gulpFile);
  var srdDstPath = path.join(serverConfig.remote.dir, serverConfig.remote.dstDir);
  var tempDir = '.asset-server-tmp';
  var rmrf = 'rm -rf ';
  var baseGitCommand = 'git -C ' + serverConfig.remote.dir + ' ';
  // workaround for cp path/* and mv path/* not working for some reason
  var dstSuffix = srdDstPath.split(/\/|\\/g);
  var tmpDstPath = dstSuffix
    ? path.join(tempDir, dstSuffix[dstSuffix.length - 1])
    : tempDir;

  gulp.task('assets', function (done) {
    shell.series([
      // prepare filesystem
      rmrf + serverConfig.dst,
      rmrf + nodeModulesPath,
      rmrf + tempDir,
      'mkdir ' + tempDir,

      // set the origin
      baseGitCommand + 'remote set-url ' + serverConfig.remote.name + ' ' + serverConfig.remote.url,

      // pull the submodule
      baseGitCommand + 'checkout ' + serverConfig.remote.branch,
      baseGitCommand + 'pull ' + serverConfig.remote.name + ' ' + serverConfig.remote.branch,
      baseGitCommand + 'submodule update --init --recursive',

      // npm install the submodule
      'npm i --prefix ' + serverConfig.remote.dir,

      // run the submodules build
      'gulp --gulpfile ' + gulpfilePath + ' ' + serverConfig.remote.gulpTask,

      // copy the submodules build to the temp dir, this is a workaround for /* not working for some reason
      'cp -R ' + srdDstPath + ' ' + tempDir,
      // move the build to its destination
      'mv ' + tmpDstPath + ' ' + serverConfig.dst,

      // clean up filesystem
      rmrf + tempDir

    ], done);
  });

};

