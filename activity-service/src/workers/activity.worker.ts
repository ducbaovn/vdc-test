import { ConsumeMessage } from "amqplib";
import { ActivityCollection } from "../collections/activities.collection";
import { Database } from "../database";

export class ActivityWorker {
  public static EXCHANGE = "activity";
  public static KEYS = ["#"];
  public static callback(msg: ConsumeMessage | null): void {
    const data = JSON.parse(msg?.content.toString() || "{}");
    data.time = new Date(data.time);
    Database.getInstance()
      .then((db) => {
        return db.getCollection(ActivityCollection.name).insertOne(data);
      })
      .catch(console.log);
  }
}
