import * as dotenv from "dotenv";
dotenv.config({
  path: __dirname + "/../.env",
});

import * as sourceMapSupport from "source-map-support";
import { AmqpConnection } from "@ducbaovn/nodejs-common";
import Configuration from "./config";
import { ActivityWorker } from "./workers/activity.worker";
import { Database } from "./database";

if (process.env.NODE_ENV !== "production") {
  sourceMapSupport.install();
}

const bootstrap = async () => {
  console.info("Connecting to database...");
  await Database.getInstance();
  console.info("Connecting to amqp server...");
  const amqp = await AmqpConnection.connect({
    host: Configuration.AMQP.HOST,
    port: Configuration.AMQP.PORT,
    username: Configuration.AMQP.USERNAME,
    password: Configuration.AMQP.PASSWORD,
  });
  console.info("Consume to activity topic. Listening for message...");
  amqp.consumeTopic(ActivityWorker.EXCHANGE, ActivityWorker.KEYS, ActivityWorker.callback);
};
bootstrap();
