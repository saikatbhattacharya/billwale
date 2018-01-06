var requestHandler = require('../middleware/requestHandler');
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer({ dest: "./uploads" });
var path = require('path');

module.exports = function (app) {
    // parse application/x-www-form-urlencoded 
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json 
    app.use(bodyParser.json())

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    })

    // Handle User data
    app.post('/user', function (req, res) {
        requestHandler.postUser(req.body, res);
    });

    app.get('/user', function (req, res) {
        requestHandler.get(req, res, 'userModel');
    });

    // Handle Customer data
    app.post('/customer', function (req, res) {
        requestHandler.postCustomer(req.body, res);
    });

    app.get('/customer', function (req, res) {
        requestHandler.get(req, res, 'customerModel');
    });

    app.get('/customer/customerMobile/:customerMobile', function (req, res) {
        requestHandler.get(req, res, 'customerModel');
    });

    // Handle Order data
    app.post('/order', function (req, res) {
        var postObj = {
            "orderId": req.body.orderId,
            "orderDate": new Date(req.body.orderDate),
            "orderItems": req.body.orderItems,
            "customerMobile": req.body.customerMobile,
            "totalBillValue": req.body.totalBillValue,
            "createdDate": Date.now(),
            "lastUpdatedDate": Date.now(),
            "isPaid": req.body.isPaid,
	    "paymentMode": req.body.paymentMode,
            "orderMode": req.body.orderMode
        }
        requestHandler.postData('orderModel', postObj, res);
    });
	
    app.put('/order', function (req, res) {
        var update = {
            "orderDate": new Date(req.body.orderDate),
            "orderItems": req.body.orderItems,
            "customerMobile": req.body.customerMobile,
            "totalBillValue": req.body.totalBillValue,
            "createdDate": Date.now(),
            "lastUpdatedDate": Date.now(),
            "isPaid": req.body.isPaid,
	    "paymentMode": req.body.paymentMode,
            "orderMode": req.body.orderMode
        }
	var query = {
	    "orderId": req.body.orderId
	}
	var options = {upsert: true}
        requestHandler.update('orderModel', query, update, options, res);
    });

    app.get('/order', function (req, res) {
        var query = [
		{
			$lookup: {
				
			                  from: "customers",
			                  localField: "customerMobile",
			                  foreignField: "customerMobile",
			                  as: "customer_info"
			                 
			}
		},
		{
			$unwind: {
			    path : "$orderItems"
			}
		},
		{
			$lookup: {
			    from: "items",
			                  localField: "orderItems.itemId",
			                  foreignField: "itemId",
			                  as: "item_info"
			}
		},
		{
			$group: {
			 _id: {orderId: "$orderId"},
			 createdDate: {$first: "$createdDate"},
			 lastUpdatedDate: {$first: "$lastUpdatedDate"},
			 isPaid: {$first: "$isPaid"},
			 orderMode: {$first: "$orderMode"},
			 items: {$push: {item_info: "$item_info", quantity: "$orderItems.quantity"}},
			 totalBillValue: {$first: "$totalBillValue"},
			 paymentMode: {$first: "$paymentMode"},
			 customerInfo: {$first: "$customer_info"}
			}
		},

	]
        requestHandler.getAggregatedValue(query, res, 'orderModel');
    });

    app.get('/order/orderId/:orderId', function (req, res) {
        var query = [
		{
			$match: {
				orderId: req.params.orderId
			}
		},
		{
			$lookup: {
				
			                  from: "customers",
			                  localField: "customerMobile",
			                  foreignField: "customerMobile",
			                  as: "customer_info"
			                 
			}
		},
		{
			$unwind: {
			    path : "$orderItems"
			}
		},
		{
			$lookup: {
			    from: "items",
			                  localField: "orderItems.itemId",
			                  foreignField: "itemId",
			                  as: "item_info"
			}
		},
		{
			$group: {
			 _id: {orderId: "$orderId"},
			 createdDate: {$first: "$createdDate"},
			 lastUpdatedDate: {$first: "$lastUpdatedDate"},
			 isPaid: {$first: "$isPaid"},
			 orderMode: {$first: "$orderMode"},
			 items: {$push: {item_info: "$item_info", quantity: "$orderItems.quantity"}},
			 totalBillValue: {$first: "$totalBillValue"},
			 customerInfo: {$first: "$customer_info"}
			}
		},

	]
        requestHandler.getAggregatedValue(query, res, 'orderModel');
    });

    app.get('/order/customerMobile/:customerMobile', function (req, res) {
        requestHandler.get(req, res, 'orderModel');
    });

    app.get('/order/latest', function (req, res) {
        var query = [
            {
                $sort : {orderId: -1}
            },
            { 
                $limit : 1 
            },
            {
                $project: {orderId: 1, _id: 0}
            }
        ]
        requestHandler.getAggregatedValue(query, res, 'orderModel');
    });

    //Handling Tax data
    app.get('/taxdetails', function (req, res) {
        requestHandler.get(req, res, 'taxesModel');
    });

    //Handling Items data
    app.get('/items', function (req, res) {
        requestHandler.get(req, res, 'itemsModel');
    });
	
    app.put('/items', function (req, res) {
        var update = {
            "isAvailable": req.body.isAvailable,
            "quantity": req.body.quantity
        }
	var query = {
	    "itemId": req.body.itemId
	}
	var options = {upsert: true}
        requestHandler.update('itemsModel', query, update, options, res);
    });
    
    app.get('/paymentModes', function (req, res) {
        requestHandler.get(req, res, 'paymentModesModel');
    });
    app.post('/paymentModes', function (req, res) {
        requestHandler.postData('paymentModesModel', req.body, res);
    });

    //Handling orderSources data
    app.get('/orderSources/orderSourceId/:orderSourceId', function (req, res) {
        requestHandler.get(req, res, 'orderSourcesModel');
    });

    //translation
    app.get('/translate/language/:language/itemName/:itemName', function(req, res) {
        requestHandler.getTranslated(req, res);
    })
}
