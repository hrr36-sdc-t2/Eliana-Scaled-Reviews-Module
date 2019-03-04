var config = require('../knexfile');
var env = 'development';
var knex = require('knex')(config[env]);

const findMostRecent = function (listingId) {
  console.log('accessing mariadb.....');
  return knex
    .from('review')
    .innerJoin('customer', 'review.customer_id', 'customer.id')
    .where('listing_id', listingId)
    .orderBy('created_at', 'desc')
    .then(records => {
      return records;
    });
};

const findMostRelevant = function (listingId) {
  console.log('accessing mariadb.....');
  return knex
    .from('review')
    .innerJoin('customer', 'review.customer_id', 'customer.id')
    .where('listing_id', listingId)
    .orderBy('user_rating', 'desc')
    .then(records => {
      return records;
    });
};

const findFilteredReviews = function (listingId, query) {
  return knex
    .from('review')
    .innerJoin('customer', 'review.customer_id', 'customer.id')
    .where('listing_id', listingId)
    .where('description', 'like', `%${query}%`)
    .then(records => {
      return records;
    });
};

module.exports = knex;

module.exports = { findMostRecent, findMostRelevant, findFilteredReviews };
