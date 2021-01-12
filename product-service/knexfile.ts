// Update with your config settings.
import * as dotenv from "dotenv"
import * as path from "path"
dotenv.config()

module.exports = {
  production: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve() + "/src/migrations"
    }
  }
};
