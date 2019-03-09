const mongoose = require('mongoose');

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

module.exports.dbConnect = dbConnect;



// exports.findRecent = function (listingId) {
//   //mongodb find and sort function
// };

// exports.findRelevant = function (listingId) {
//   //mongodb find and sort by customer_rating function
// };

// exports.findFiltered = function (listingId, query) {
//   //mongodb find and filter function
// };

