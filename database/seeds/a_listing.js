const TOTAL_ENTRIES = 10000000;
const CHUNK_SIZE = 5000;
const TOTAL_CHUNKS = TOTAL_ENTRIES / CHUNK_SIZE;

var makeFakeListings = function (offset) {
  var fakeListings = [];
  var desiredFakeListings = CHUNK_SIZE;
  for (let i = 1; i < desiredFakeListings + 1; i++) {
    fakeListings.push({ 'id': offset + i });
  }
  return fakeListings;
};

exports.seed = async function (knex, Promise) {
  return knex('listing').del()
    .then(async function () {
      for (var i = 0; i < TOTAL_CHUNKS; i++) {
        await knex('listing').insert(makeFakeListings(i * CHUNK_SIZE));
      }
      return Promise.resolve(true);
    })
};
