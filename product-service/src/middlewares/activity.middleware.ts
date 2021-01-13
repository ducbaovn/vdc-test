import { AmqpConnection } from "@ducbaovn/nodejs-common";
import * as express from "express";
import * as uuid from "uuid";
import Configuration from "../config";

export const activityMiddleware = (resource: string): express.RequestHandler => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const activityData = JSON.stringify({
      resource,
      method: req.method,
      url: req.originalUrl,
      userId: uuid.v4(), // TODO: replace with real userId got by access token
      time: new Date(),
    });
    const amqpConn = await AmqpConnection.connect({
      host: Configuration.AMQP.HOST,
      port: Configuration.AMQP.PORT,
      username: Configuration.AMQP.USERNAME,
      password: Configuration.AMQP.PASSWORD,
    });
    const key = `${resource}.${req.method}`;
    amqpConn.publishTopic("activity", key, activityData);
    next();
  };
};
