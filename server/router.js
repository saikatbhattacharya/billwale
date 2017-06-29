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
        requestHandler.getAll(req, res, 'userModel');
    });

    // Handle Customer data
    app.post('/customer', function (req, res) {
        requestHandler.postCustomer(req.body, res);
    });

    app.get('/customer', function (req, res) {
        requestHandler.getAll(req, res, 'customerModel');
    });

    app.get('/customer/customerMobile/:customerMobile', function (req, res) {
        requestHandler.getOne(req, res, 'customerModel');
    });

    // Handle Order data
    app.post('/order', function (req, res) {
        var postObj = {
            "orderId": req.body.orderId,
            "orderDate": new Date(req.body.orderDate),
            "orderItems": req.body.orderItems,
            "customerMobile": req.body.customerMobile,
            "totalBillValue": req.body.totalBillValue
        }
        requestHandler.postData('orderModel', postObj, res);
    });

    app.get('/order', function (req, res) {
        requestHandler.getAll(req, res, 'orderModel');
    });

    app.get('/order/orderId/:orderId', function (req, res) {
        requestHandler.getOne(req, res, 'orderModel');
    });

    app.get('/order/customerMobile/:customerMobile', function (req, res) {
        requestHandler.getOne(req, res, 'orderModel');
    });

    app.get('/order/latest', function (req, res) {
        var query = [
            {
                $sort : {orderDate: -1}
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
        requestHandler.getAll(req, res, 'taxDetailsModel');
    });

    //Handling Items data
    app.get('/items', function (req, res) {
        requestHandler.getAll(req, res, 'itemsModel');
    });
}