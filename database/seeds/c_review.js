const faker = require("faker");
const asyncPool = require("tiny-async-pool");

const TOTAL_ENTRIES = 70000000;
const CHUNK_SIZE = 1000;
const CONCURRENCY = 8;
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

var makeFakeReviews = function (offset) {
  var fakeReviews = [];
  for (let i = 1; i < CHUNK_SIZE + 1; i++) {
    fakeReviews.push({
      // id: offset + i,
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
  }
  return fakeReviews;
};

// var chunkMaker = 
// }
// const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));

exports.seed = async function (knex, Promise) {
  return knex('review').del()
    .then(async function () {
      var total_time_generator = 0;
      var total_time_sql = 0;
      var dummy = [];
      for (var i = 0; i < TOTAL_CHUNKS; i++) {
        dummy.push(null);
      }

      const results = await asyncPool(CONCURRENCY, dummy, function () {
        // return new Promise(function (resolve) {
        var time_start_gen = new Date();
        var temp = makeFakeReviews();
        var time_end_gen = new Date();
        total_time_generator += time_end_gen - time_start_gen;
        return knex('review').insert(temp);
        // });
      });
      // await Promise.all([
      //   function () {
      //     var temp = makeFakeReviews(i * CHUNK_SIZE);
      //     return knex('review').insert(temp);
      //   }(),
      //   function () {
      //     var temp = makeFakeReviews((i + 1) * CHUNK_SIZE);
      //     return knex('review').insert(temp);
      //   }(),
      //   function () {
      //     var temp = makeFakeReviews((i + 1) * CHUNK_SIZE);
      //     return knex('review').insert(temp);
      //   }(),
      //   function () {
      //     var temp = makeFakeReviews((i + 1) * CHUNK_SIZE);
      //     return knex('review').insert(temp);
      //   }()
      // ]);
      // var time_start_gen = new Date();
      // var temp = makeFakeReviews();
      // var time_end_gen = new Date();
      // total_time_generator += (time_end_gen - time_start_gen);
      // var time_start = new Date();

      // await knex('review').insert(temp);
      // await knex.batchInsert('review', temp, CHUNK_SIZE)
      // var time_end = new Date();
      // total_time_sql += (time_end - time_start);
      // }
      console.log(total_time_generator, 'total_time_generator');
      // console.log(total_time_sql, 'total_time_sql');
      return Promise.resolve(true);
    })
};
