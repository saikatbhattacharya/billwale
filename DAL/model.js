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

var orderSourcesSchema = new mongoose.Schema(schema['orderSources']);
var orderSourcesModel = mongoose.model('orderSources', orderSourcesSchema);

var taxesSchema = new mongoose.Schema(schema['taxes']);
var taxesModel = mongoose.model('taxes', taxesSchema);

var paymentModesSchema = new mongoose.Schema(schema['paymentModes']);
var paymentModesModel = mongoose.model('paymentModes', paymentModesSchema);

module.exports = {
  userModel, itemsModel, customerModel, orderModel, orderSourcesModel, taxesModel, paymentModesModel
}

