var http = require('http-as-promised');
var config = require('../config');
var dbLayer = require('../DAL');
var responseHandler = require('./responseHandler');

module.exports = {
    postUser: function (userObj, res) {
        dbLayer.CREATE('userModel', {
            name: userObj.name,
            id: userObj.id,
            role: userObj.role
        }, res)
    },

    postCustomer: function (customerObj, res) {
        dbLayer.CREATE("customerModel", {
            "customerName": customerObj.customerName,
            "customerMobile": parseInt(customerObj.customerMobile),
            "customerEmail": customerObj.customerEmail,
            "customerId": customerObj.customerId
        }, res)
    },
    get: function (req,res, model) {
        dbLayer.READ(model, req.params, res);
    },
    getAggregatedValue: function (query, res, model) {
        dbLayer.AGGREGATE(model, query, res);
    },
    postData: function (model, postObj, res) {
        dbLayer.CREATE(model, postObj, res);
    },
    update: function (model, query, update, options, res) {
        dbLayer.UPDATE(model, query, update, options, res);
    },
    getTranslated: function (req, res) {
        http(config.translationURL+'?client=gtx&sl=en&tl='+req.params['language']+'&dt=t&q=' + req.params['itemName'])
        .spread(function (response, body) {
            var output = JSON.parse(JSON.stringify(body));
            var result = output.split('"');
            responseHandler.response(result[1], res);
        })
        .catch(function (error) {
            responseHandler.errorRes(error, res);
        });
    }
}
