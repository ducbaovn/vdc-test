import * as trace from "stack-trace";
import { HttpCode } from "../enums";
import { ErrorCode } from "./error_code";

export class ApiError implements Error {
  public name = "ApiError";
  public stack: any;
  public message: string;
  public code: string;
  public httpStatus: number;
  public rawError!: Error;

  public static fromError(
    error: Error,
    errorCode: ErrorCode = ErrorCode.GENERIC,
    httpStatus: number = HttpCode.INTERNAL_SERVER_ERROR,
    stack?: boolean,
  ): ApiError {
    const exception = new ApiError(errorCode, httpStatus, stack);
    exception.rawError = error;
    if (stack && error != null) {
      exception.stack = trace.parse(error);
    }
    return exception;
  }

  constructor(
    errorCode: ErrorCode = ErrorCode.GENERIC,
    httpStatus: number = HttpCode.INTERNAL_SERVER_ERROR,
    stack?: boolean,
  ) {
    const { code, message } = errorCode;
    this.code = code;
    this.message = message;
    this.httpStatus = httpStatus;
    if (stack) {
      this.stack = trace.parse(<any>new Error());
    }
  }

  public toString() {
    return `${this.name}: ${this.message}`;
  }

  public toErrorCode(): ErrorCode {
    return new ErrorCode(this.code, this.message);
  }
}
