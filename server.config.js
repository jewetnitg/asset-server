/**
 * @author rik
 */
module.exports = {
  dst: 'assets',

  // submodule repo that contains the project that builds the static assets
  remote: {
    // name of the remote
    name: 'origin',
    // url of repo
    url: 'https://github.com/jewetnitg/boilerplate.git',
    // branch to check out and pull
    branch: 'master',
    // path to the gulpfile of the submodule, relative to the submodule
    gulpFile: 'gulpfile.js',
    // gulp task that builds the submodule
    gulpTask: 'build:prod',
    // dir to the submodule
    dir: './src',
    // dir to the build, relative to the submodule
    dstDir: 'build/dst'
  }
};