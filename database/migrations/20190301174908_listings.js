
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
      review.increments('id').primary().notNull();
      review.integer('customer_id').notNull();
      review.integer('listing_id').notNull();
      review.timestamp('created_at').notNull();
      review.string('description', 1000).notNull();
      review.integer('customer_rating').notNull();
      review.integer('accuracy').notNull();
      review.integer('communication').notNull();
      review.integer('cleanliness').notNull();
      review.integer('location').notNull();
      review.integer('check_in').notNull();
      review.integer('value').notNull();
      // review.index(['listing_id', 'created_at']); //create indexes after tables are seeded
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
