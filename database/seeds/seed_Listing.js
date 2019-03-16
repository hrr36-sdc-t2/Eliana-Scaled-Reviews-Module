const mongoose = require('mongoose');
const mongodb = require('../mongodb.js');
const Listing = require('../models/Listing.js').Listing;
const asyncPool = require('../util/async_pool_util.js');
const createFakeReview = require('../util/seed_util.js');

// CONNECTION EVENTS
// When successfully connected seed customers collection and close mongodb connection
mongoose.connection.on('connected', async function () {
  await seedListingsCollection();
  mongoose.connection.close();
});
// establish connection
mongodb.dbConnect();


//GENERATE AND INSERT FAKE DATA USING THESE SETTINGS
const TOTAL_ENTRIES = 10000000;
const CHUNK_SIZE = 1000;
const CONCURRENCY = 4;
const TOTAL_CHUNKS = TOTAL_ENTRIES / CHUNK_SIZE;

var listingCounter = 1;
var reviewCounter = 1;

var makeReviewDocuments = function () {
  var fakeReviews = [];
  var randomQuantityOfReviews = Math.floor((Math.random() * 15) + 1);
  for (let i = 0; i < randomQuantityOfReviews; i++) {
    var review = createFakeReview();
    review['_id'] = new mongoose.Types.ObjectId;
    fakeReviews.push(review);
  }
  return fakeReviews;
}

var makeListingDocuments = function () {
  var fakeListing = [];
  for (let i = 0; i < CHUNK_SIZE; i++) {
    fakeListing.push({
      _id: listingCounter++,
      review: makeReviewDocuments()
    });
  }
  return fakeListing;
};

//INSERT FAKE DATA 
//*** ADD INDEXING ON CUSTOMER_ID AFTER SEEDING MONGODB ***/
const seedListingsCollection = async function (callback) {
  var total_time_generator = 0;
  var total_time_insertion = 0;
  var chunks_processed = 0;
  var dummy = [];
  for (var i = 0; i < TOTAL_CHUNKS; i++) {
    dummy.push(null);
  }
  const results = await asyncPool(CONCURRENCY, dummy, function () {
    var time_start_gen = new Date();
    let data = makeListingDocuments();
    var time_end_gen = new Date();
    total_time_generator += time_end_gen - time_start_gen;
    var time_start_insert = new Date();
    var promise = Listing.collection.insertMany(data);
    var time_end_insert = new Date();
    total_time_insertion += time_end_insert - time_start_insert;
    if (chunks_processed % Math.floor(TOTAL_CHUNKS/10) == 0) {
      console.log("" + (new Date()) + ": Processed " + chunks_processed + " / " + TOTAL_CHUNKS + " chunks");
    }
    return promise;
  });
  console.log(total_time_generator, 'total_time_generator');
  console.log(total_time_insertion, 'total_time_insertion');
}

