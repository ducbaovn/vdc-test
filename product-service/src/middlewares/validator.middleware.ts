import { Validator } from "jsonschema";
import * as express from "express";
import { ApiError, ErrorCode, HttpCode } from "@ducbaovn/nodejs-common";

export const bodyValidatorMiddleware = (schema: any): express.RequestHandler => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const validator = new Validator()
    const {
      valid,
      errors
    } = validator.validate(req.body, schema)
    if (!valid) {
      let errorMessage = ""
      errors.forEach(err => {
        const { property, message } = err
        errorMessage += `${property} - ${message}\n`
      })
      next(new ApiError(
        new ErrorCode(
          ErrorCode.INVALID_REQUEST.code,
          errorMessage
        ),
        HttpCode.BAD_REQUEST
      ))
    }
    next()
  };
};
