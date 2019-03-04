
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('listing', function (listing) {
      listing.increments('id').primary();
    }),
    knex.schema.createTable('customer', function (customer) {
      customer.increments('id').primary();
      customer.string('name', 20);
      customer.string('avatar_url', 512);
    }),
    knex.schema.createTable('review', function (review) {
      review.increments('id').primary();
      review.integer('customer_id');
      review.integer('listing_id');
      review.timestamp('created_at');
      review.string('description', 1000);
      review.integer('customer_rating');
      review.integer('accuracy');
      review.integer('communication');
      review.integer('cleanliness');
      review.integer('location');
      review.integer('check_in');
      review.integer('value');

      review.index(['listing_id', 'created_at']);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('review'),
    knex.schema.dropTable('listing'),
    knex.schema.dropTable('customer')
  ]);
};
