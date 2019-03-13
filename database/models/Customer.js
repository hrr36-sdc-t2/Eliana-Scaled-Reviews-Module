/* eslint-disable camelcase */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  _id: { type: Number, required: true },
  name: String,
  avatar_url: String,
  customer_rating: Number
}, { id: false });

const Customer = mongoose.model('Customer', customerSchema);

module.exports.Customer = Customer;