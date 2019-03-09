const mongoose = require('mongoose');
const faker = require('faker');
const mongodb = require('./mongodb.js');
const Listing = require('./models/Listing.js').Listing;
const asyncPool = require('./async_pool_util.js');

// CONNECTION EVENTS
// When successfully connected seed customers collection and close mongodb connection
mongoose.connection.on('connected', async function () {
  await seedListingsCollection();
  console.log(reviewCounter);
  mongoose.connection.close();
});
// establish connection
mongodb.dbConnect();


//GENERATE AND INSERT FAKE DATA USING THESE SETTINGS
const TOTAL_ENTRIES = 10000000;
const CHUNK_SIZE = 1000;
const CONCURRENCY = 4;
const TOTAL_CHUNKS = TOTAL_ENTRIES / CHUNK_SIZE;

var reviewCounter = 1;
var listingCounter = 1;

var createFakeReview = () => ({
  created_at: faker.date.past(),
  description: faker.lorem.sentences(),
  accuracy: faker.random.number({
    min: 3,
    max: 5
  }),
  communication: faker.random.number({
    min: 3,
    max: 5
  }),
  cleanliness: faker.random.number({
    min: 3,
    max: 5
  }),
  location: faker.random.number({
    min: 3,
    max: 5
  }),
  check_in: faker.random.number({
    min: 1,
    max: 5
  }),
  value: faker.random.number({
    min: 2,
    max: 5
  }),
  //3M customers
  customer_id: faker.random.number({
    min: 1,
    max: 3000000
  }),
  _id: reviewCounter++
});


var makeReviewDocuments = function () {
  var fakeReviews = [];
  var randomQuantityOfReviews = Math.floor((Math.random() * 15) + 1);
  for (let i = 0; i < randomQuantityOfReviews; i++) {
    fakeReviews.push(createFakeReview());
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
    return promise;
  });
  console.log(total_time_generator, 'total_time_generator');
  console.log(total_time_insertion, 'total_time_insertion');
}

