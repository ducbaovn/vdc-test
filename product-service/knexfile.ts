// Update with your config settings.
import * as dotenv from "dotenv"
import * as path from "path"
dotenv.config()

module.exports = {
  test: {
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/src/migrations"
    },
    seeds: {
      directory: __dirname + "/test/api_test/seeds"
    }
  },
  production: {
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/src/migrations"
    }
  }
};
