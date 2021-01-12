import { MongoClient, Db } from "mongodb";

export interface MongoDbConfig {
  connectionString?: string;
  database?: string;
}

export class MongoDbConnection {
  protected mongoClient!: Db;
  protected config: MongoDbConfig;

  constructor(config?: MongoDbConfig) {
    const defaultConf: any = {
      connectionString: "mongodb://localhost:27017",
      database: "mydb",
    };
    const conf = Object.assign({}, defaultConf, config || {});
    this.config = conf;
  }

  public getClient(): Db {
    return this.mongoClient
  }

  public async connect(): Promise<void> {
    if (!this.mongoClient) {
      const client = await MongoClient.connect(
        this.config.connectionString as string,
        { useUnifiedTopology: true }
      );
      this.mongoClient = client.db(this.config.database);
    }
  }
}
