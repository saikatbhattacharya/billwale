var mongoose = require('mongoose');
var config = require('../config');
var schema = require('./schema.json');
var model = require('./model');
var responseHandler = require('../middleware/responseHandler');
var fs = require("fs");
var gfs;
var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;


mongoose.connect(config.mongodb);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  gfs = Grid(db.db);
  console.log("Connected!!")
});

module.exports = {
  CREATE: function (modelName, postData, res) {    
    var newModel = new model[modelName](postData);

    newModel.save(function (err, data) {
      if (err) {
        responseHandler.errorRes(err, res);
      }
      else {
        responseHandler.response(data, res);
      }
    })
  },
  READ: function (modelName, query, res) {
    model[modelName].find(query, function (err, data) {
      if (err) {
        responseHandler.errorRes(err, res);
      }
      else {
        responseHandler.response(data, res);
      }
    })
  },
  AGGREGATE: function (modelName, query, res) {
    model[modelName].aggregate(query, function(err, data) {
      if (err) {
        responseHandler.errorRes(err, res);
      }
      else {
        responseHandler.response(data, res);
      }
    })
  }
};
