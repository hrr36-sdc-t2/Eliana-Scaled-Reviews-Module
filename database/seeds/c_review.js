const faker = require("faker");

const TOTAL_ENTRIES = 100000000;
const CHUNK_SIZE = 5000;
const TOTAL_CHUNKS = TOTAL_ENTRIES / CHUNK_SIZE;

const createFakeReview = () => ({
  created_at: faker.date.past(),
  description: faker.lorem.sentences(),
  customer_rating: faker.random.number({
    min: 0,
    max: 100
  }),
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
  //10M listings 
  listing_id: faker.random.number({
    min: 1,
    max: 10000000
  }),
  //1K customers
  customer_id: faker.random.number({
    min: 1,
    max: 500000
  })
});

var makeFakeReviews = function () {
  var fakeReviews = [];
  for (let i = 0; i < CHUNK_SIZE; i++) {
    fakeReviews.push(createFakeReview());
  }
  return fakeReviews;
};

exports.seed = async function (knex, Promise) {
  return knex('review').del()
    .then(async function () {
      for (var i = 0; i < TOTAL_CHUNKS; i++) {
        await knex('review').insert(makeFakeReviews());
      }
      return Promise.resolve(true);
    })
};
