import * as express from "express";
import { ApiError } from "../errors";

export const recover = (): express.ErrorRequestHandler => {
  const fallback = (error: any, res: express.Response): void => {
    res.status(500);
    res.end();
  };

  return (error: any, req: express.Request, res: express.Response, next: express.NextFunction): any => {
    if (error.constructor && error.constructor.name === "Error") {
      error = new ApiError();
    }
    res.status(error.httpStatus);
    res.json(error.toErrorCode());
    if (!res.writableFinished) {
      fallback(error, res);
    }
  };
};

export default recover;
