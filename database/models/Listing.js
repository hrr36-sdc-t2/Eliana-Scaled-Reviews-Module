/* eslint-disable camelcase */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  _id: { type: Number, required: true },
  created_at: { type: Date, required: true },
  description: String,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  check_in: Number,
  value: Number,
  customer_id: { type: Number, ref: 'Customer', index: true },
}, { id: false });

const listingSchema = new Schema({
  _id: { type: Number, required: true },
  review: [reviewSchema],
}, { id: false });

const Listing = mongoose.model('Listing', listingSchema);

module.exports.Listing = Listing;

