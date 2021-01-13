import { Collection } from "mongodb";
import { MongoDbConnection } from "@ducbaovn/nodejs-common";
import Configuration from "./config";
import { ActivityCollection } from "./collections/activities.collection";

export class Database extends MongoDbConnection {
  private static instance: Database;
  private constructor() {
    super({
      host: Configuration.DATABASE.HOST,
      port: Configuration.DATABASE.PORT,
      username: Configuration.DATABASE.USERNAME,
      password: Configuration.DATABASE.PASSWORD,
      database: Configuration.DATABASE.DB,
    });
  }

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      const instance = new Database();
      await instance.connect();
      const exist = await instance.getClient().listCollections({ name: "activities" }, { nameOnly: true }).toArray();
      if (!exist[0]) {
        console.log("create schema");
        await instance.getClient().createCollection(ActivityCollection.name, ActivityCollection.schema);
      }
      Database.instance = instance;
    }
    return Database.instance;
  }

  public getCollection(name: string): Collection {
    return this.getClient().collection(name);
  }
}
