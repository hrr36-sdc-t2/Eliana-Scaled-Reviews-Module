const faker = require("faker");

const TOTAL_ENTRIES = 500000;
const CHUNK_SIZE = 5000;
const TOTAL_CHUNKS = TOTAL_ENTRIES / CHUNK_SIZE;

const createFakeCustomer = (id) => ({
  id: id,
  name: faker.name.firstName(),
  avatar_url: faker.image.avatar(),
});

var makeFakeCustomers = function (offset) {
  var fakeCustomers = [];
  var desiredFakeCustomers = CHUNK_SIZE;
  for (let i = 1; i < desiredFakeCustomers + 1; i++) {
    fakeCustomers.push(createFakeCustomer(offset + i));
  }
  return fakeCustomers;
};

exports.seed = async function (knex, Promise) {
  return knex('customer').del()
    .then(async function () {
      for (var i = 0; i < TOTAL_CHUNKS; i++) {
        await knex('customer').insert(makeFakeCustomers(i * CHUNK_SIZE));
      }
      return Promise.resolve(true);
    })
};