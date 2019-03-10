const mongodb = require('../database/mongodb.js');
const mongoose = require('mongoose');
const Listing = require('../database/models/Listing.js').Listing;
const createFakeReview = require('../database/seed_util.js');

//on connection, do test read and post requests
mongoose.connection.on('connected', async function () {
  await getAllReviewsByListingId();
  mongoose.connection.close();
});
//connect to db
mongodb.dbConnect();

//helper function to get a random number within a range
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

//getall reviews for 1000 listings and ~8000 reviews
var getAllReviewsByListingId = async function () {
  var total_time_fetch = 0;
  var time_start = Date.now();
  for (var i = 0; i < 10000; i++) {
    var randomListing = getRandomIntInclusive(9999900, 10000000);
    var listings = await Listing.findById(randomListing)
    // listings.exec(function (err, result) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    // if (i % 100 === 0) {
    //   console.log(listings);
    // }
  }
  var time_end = Date.now()
  total_time_fetch = time_end - time_start;
  console.log(total_time_fetch, 'THIS IS TOTAL TIME');
}


//create a 1000 reviews for a random number of listings
var createReviewsByListingId = async function () {
  
  var total_time_fetch = 0;
  var time_start = Date.now();
  for (var i = 0; i < 1000; i++) {
    var randomListing = getRandomIntInclusive(9999900, 10000000);
    await Listing.findById(randomListing).exec(function (err, result) {
      if (err) {
        console.log(err)
      } else if (result) {
        result.review.push(createFakeReview())
      }
    });
  }
  var time_end = Date.now()
  total_time_fetch = time_end - time_start;
  console.log(total_time_fetch, 'THIS IS TOTAL TIME');
}


//delete a review for a listing


