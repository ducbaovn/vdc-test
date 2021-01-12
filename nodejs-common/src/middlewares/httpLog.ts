import * as express from "express";

export const httpLog = (): express.RequestHandler => {
  return (req: express.Request, res: any, next: express.NextFunction) => {
    const Logger = res.locals.logger || console;
    res.locals.startTime = Date.now();
    // Capture end function in Request object to calculate information
    let endFunc = res.end;
    res.end = (chunk: any, encoding: any) => {
      res.responseTime = Date.now() - res.locals.startTime;
      res.end = endFunc;
      res.end(chunk, encoding);
      req.url = req.originalUrl || req.url;

      const format = `${req.ip} ${req.method} ${req.url} ${res.responseTime}ms ${chunk ? chunk.length : 0}bytes ${
        res.statusCode
      } ${res.statusMessage}`;
      const meta = {
        ip: req.ip,
        method: req.method,
        path: req.path ? req.path : "",
        time: res.responseTime,
        size: chunk ? chunk.length : 0,
        statusCode: res.statusCode,
        headers: req.headers,
        body: req.body,
      };
      switch (true) {
        case req.path === "/ping":
          break;
        case res.statusCode < 200:
          Logger.warn(format, meta);
          break;
        case res.statusCode > 199 && res.statusCode < 300:
          Logger.log(format, meta);
          break;
        case res.statusCode > 299 && res.statusCode < 500:
          Logger.warn(format, meta);
          break;
        default:
          Logger.error(format, meta);
      }

      endFunc = null;
    };
    next();
  };
};

export const httpError = (): express.ErrorRequestHandler => {
  return (error: any, req: express.Request, res: express.Response, next: express.NextFunction): any => {
    const Logger = res.locals.logger;
    // Log warning for handled exception
    // Log error for unhandled exception
    if (error.constructor && error.constructor.name === "Error") {
      Logger.error(error);
    } else {
      Logger.warn(error);
    }
    next(error);
  };
};
