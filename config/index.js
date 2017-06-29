var configFilePath = process.env.NODE_ENV?'./config.'+process.env.NODE_ENV+'.js':'./config.development.js';
var config = require(configFilePath);

module.exports = config;