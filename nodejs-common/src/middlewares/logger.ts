import * as express from "express";
import { LoggerService } from "../services";

export const logger = (level = "info"): express.RequestHandler => {
  return (req, res, next) => {
    const logger = new LoggerService({
      level: level,
    });
    res.locals.logger = logger;
    next();
  };
};
