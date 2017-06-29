var mongoose = require('mongoose');
var schema = require('./schema.json');

var userSchema = new mongoose.Schema(schema['users']);
var userModel = mongoose.model('user', userSchema);

var itemsSchema = new mongoose.Schema(schema['items']);
var itemsModel = mongoose.model('items', itemsSchema);

var customerSchema = new mongoose.Schema(schema['customers']);
var customerModel = mongoose.model('customer', customerSchema);

var orderSchema = new mongoose.Schema(schema['orders']);
var orderModel = mongoose.model('order', orderSchema);

var taxDetailsSchema = new mongoose.Schema(schema['taxDetails']);
var taxDetailsModel = mongoose.model('taxDetails', taxDetailsSchema);

module.exports = {
  userModel, itemsModel, customerModel, orderModel, taxDetailsModel
}

