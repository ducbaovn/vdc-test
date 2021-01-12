import Knex from "knex";
import waitOn from "wait-on";

export interface SqlConfig {
  client?: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
  charset?: string;
  timezone?: string;
  debug?: boolean;
  migrationFolder?: string;
}

export class SqlConnection {
  protected instance: Knex;
  protected config: SqlConfig;

  constructor(config: SqlConfig = {}) {
    const defaultConf: any = {
      client: "mysql",
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "admin",
      database: "test",
      charset: "utf8mb4",
      timezone: "UTC",
      debug: false,
    };
    const conf = Object.assign({}, defaultConf, config);

    this.config = conf;
    this.instance = Knex({
      client: conf.client,
      connection: conf,
      debug: conf.debug,
    });
  }

  public async migration(): Promise<void> {
    console.info("Wait for database connection");
    try {
      await waitOn({
        resources: [`tcp:${this.config.host}:${this.config.port}`],
        timeout: 30000,
        tcpTimeout: 10000,
      });
      if (this.config.migrationFolder) {
        console.info("Perform database migration");
        await this.instance.migrate.latest({
          directory: this.config.migrationFolder,
        });
      }
      console.info("All migrations were success");
    } catch (error) {
      console.error("Cannot connect database");
    }
  }
}
