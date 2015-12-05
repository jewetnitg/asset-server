var PushStateAssetServer = require('pushstate-asset-server');
var config = require('./server.config');

// set the dst dir to be the root of the static assets
config.root = config.dst;

var server = PushStateAssetServer(config);

module.exports = server;