const faker = require('faker');

var createFakeReview = (review_id) => ({
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
  })
});

module.exports = createFakeReview;