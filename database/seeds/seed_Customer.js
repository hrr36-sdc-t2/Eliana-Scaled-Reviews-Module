const mongoose = require('mongoose');
const faker = require('faker');
const Schema = mongoose.Schema;
const mongodb = require('../mongodb.js');
const Customer = require('../models/Customer.js').Customer;

// CONNECTION EVENTS
// When successfully connected seed customers collection and close mongodb connection
mongoose.connection.on('connected', async function () {
  await seedCustomersCollection();
  mongoose.connection.close();
});
// establish connection
mongodb.dbConnect();


//GENERATE FAKE DATA USING THESE SETTINGS
const totalCustomers = 3000000;
const chunkSize = 1000;
const totalChunks = totalCustomers / chunkSize;
var counter = 1;

//fake data generation using Customer model
const createCustomerData = () => ({
  _id: counter++,
  name: faker.name.firstName(),
  avatar_url: faker.image.avatar(),
  customer_rating: faker.random.number({
    min: 0,
    max: 100
  }),
});

//chunk Customer documents into arrays of 1K
const makeCustomerDocuments = function () {
  var fakeCustomers = [];
  for (let i = 0; i < chunkSize; i++) {
    fakeCustomers.push(createCustomerData());
  }
  return fakeCustomers;
};

//INSERT FAKE DATA 
const seedCustomersCollection = async function (callback) {
  var total_time_generator = 0;
  var total_time_insertion = 0;
  for (var i = 0; i < totalChunks; i++) {
    var time_start_gen = new Date();
    let data = makeCustomerDocuments();
    var time_end_gen = new Date();
    total_time_generator += time_end_gen - time_start_gen;
    var time_start_insert = new Date();
    await Customer.collection.insertMany(data);
    var time_end_insert = new Date();
    total_time_insertion += time_end_insert - time_start_insert;
  }
  console.log(total_time_generator, 'total_time_generator');
  console.log(total_time_insertion, 'total_time_insertion');
}
