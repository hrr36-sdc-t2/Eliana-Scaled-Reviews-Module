module.exports = {
  development: {
    client: "postgresql",
    connection: {
      // change these to reflect your settings
      host: "localhost",
      user: "elianasurUnder",
      database: "reviews"
    },
    migrations: {
      directory: __dirname + "/database/migrations"
    },
    seeds: {
      directory: __dirname + "/database/seeds"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      database: process.env.RDS_DB_NAME
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      database: process.env.RDS_DB_NAME
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: __dirname + "/database/seeds"
    }
  }
};
