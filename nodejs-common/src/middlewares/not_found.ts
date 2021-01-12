import * as express from "express";
import { HttpCode } from "../enums";
import { ApiError, ErrorCode } from "../errors";

export const notFound = (): express.RequestHandler => {
  return (req: express.Request, res: express.Response, next: express.NextFunction): any => {
    next(new ApiError(ErrorCode.NOT_FOUND, HttpCode.NOT_FOUND));
  };
};

export default notFound;
