import * as express from "express";
import { LoggerService } from "../services";

export const logger = (level = "info"): express.RequestHandler => {
  return (req, res, next) => {
    const correlationId = req.headers["x-correlation-id"] as string
    const logger = new LoggerService({
      level,
      correlationId,
    });
    res.locals.logger = logger;
    next();
  };
};
