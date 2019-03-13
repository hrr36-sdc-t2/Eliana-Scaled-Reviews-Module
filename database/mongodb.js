const mongoose = require('mongoose');
const Listing = require('./models/Listing.js').Listing;

// CREATE CONNECTION
// Build the connection string 
let dbURI = 'mongodb://localhost/bearbnb_reviews';
// Create the database connection 
const dbConnect = () => {
  return mongoose.connect(dbURI, { useNewUrlParser: true });
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});
// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const formatReviews = function(reviews) {
  var cleanedRecords = reviews.map((obj) =>  {
    obj.review['name'] = obj.customerArray[0].name;
    obj.review['avatar_url'] = obj.customerArray[0].avatar_url;
    obj.review['customer_rating'] = obj.customerArray[0].customer_rating;
    obj.review['listing_id'] = obj._id;
    return obj.review;
  });
  return cleanedRecords;
}



//MONGOOSE QUERIES
const findMostRecent = function (listingId) {
//mongoose find by listing_id and sort by review date
  console.log(listingId, 'this is lisitngid');
  return Listing.aggregate([
    {$match: {
      _id: listingId
    }},
    {$unwind: "$review"},
    {$sort: {
      'review.created_at': -1
    }},
    {$lookup: {
      from: 'customers',
      localField: 'review.customer_id',
      foreignField: '_id',
      as: 'customerArray'
    }}
  ]).exec()
  .then((records) => {
    return formatReviews(records);
  })
};

const findMostRelevant = function (listingId) {
//mongoose find by listing_id and sort by customer_rating 
  return Listing.aggregate([
    {$match: {
      _id: listingId
    }},
    {$unwind: "$review"},
    {$lookup: {
      from: 'customers',
      localField: 'review.customer_id',
      foreignField: '_id',
      as: 'customerArray'
    }},
    {$unwind: '$customerArray'},
    {$sort: {
      'customerArray.customer_rating': -1,
    }}
  ]).exec(); 
};

module.exports = { 
  dbConnect: dbConnect,
  findMostRecent: findMostRecent,
  findMostRelevant: findMostRelevant 
}

// exports.findFiltered = function (listingId, query) {
//   //mongodb find and filter function
// };