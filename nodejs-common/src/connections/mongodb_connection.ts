import { MongoClient, Db } from "mongodb";
import waitOn from "wait-on";

export interface MongoDbConfig {
  host?: string;
  port?: string;
  username?: string;
  password?: string;
  database?: string;
}

export class MongoDbConnection {
  protected mongoClient!: Db;
  protected config: MongoDbConfig;

  constructor(config?: MongoDbConfig) {
    const defaultConf: any = {
      host: "localhost",
      port: 27017,
      username: "root",
      password: "example",
      database: "mydb",
    };
    const conf = Object.assign({}, defaultConf, config || {});
    this.config = conf;
  }

  public getClient(): Db {
    return this.mongoClient;
  }

  get connectionString() {
    const { username, password, host, port } = this.config;
    return `mongodb://${username}:${password}@${host}:${port}`;
  }

  public async connect(): Promise<void> {
    if (!this.mongoClient) {
      console.info(`Waiting for mongodb server on ${this.connectionString}`);
      await waitOn({
        resources: [`tcp:${this.config.host}:${this.config.port}`],
        timeout: 30000,
        tcpTimeout: 10000,
      });
      console.info(`Connecting to mongodb server...`);
      const client = await MongoClient.connect(this.connectionString as string, { useUnifiedTopology: true });
      this.mongoClient = client.db(this.config.database);
    }
  }
}
