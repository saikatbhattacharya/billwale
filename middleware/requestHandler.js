var dbLayer = require('../DAL');
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
    getAll: function (req,res, model) {
        dbLayer.READ(model, req.params, res);
    },
    getOne: function (req,res, model) {
        dbLayer.READ(model, req.params, res);
    },
    getAggregatedValue: function (query, res, model) {
        dbLayer.AGGREGATE(model, query, res);
    },
    postData: function (model, postObj, res) {
        dbLayer.CREATE(model, postObj, res);
    }
}