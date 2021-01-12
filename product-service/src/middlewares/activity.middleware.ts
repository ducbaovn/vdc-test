import { AmqpConnection } from "@ducbaovn/nodejs-common";
import * as express from "express";
import * as uuid from "uuid";

export const activityMiddleware = (resource: string): express.RequestHandler => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const activityData = JSON.stringify({
      resource,
      method: req.method,
      url: req.originalUrl,
      userId: uuid.v4(),
      time: new Date(),
    });
    const amqpConn = await AmqpConnection.connect();
    const key = `${resource}.${req.method}`;
    amqpConn.publishTopic("activity", key, activityData);
    next();
  };
};
