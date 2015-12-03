var PushStateAssetServer = require('pushstate-asset-server');
var config = require('./server.config');

var server = PushStateAssetServer(config);

server.start();

module.exports = server;