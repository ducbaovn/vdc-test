export class ErrorCode {
  static GENERIC = new ErrorCode("0000", "Internal Server Error.");
  static SYSTEM_TIMEOUT = new ErrorCode("0001", "System timeout");
  static NOT_FOUND = new ErrorCode("0002", "Resource not found");
  static MISSING_PARAMETERS = new ErrorCode("0003", "Missing parameters");
  static INVALID_REQUEST = new ErrorCode("0004", "Invalid request");

  constructor(public code: string, public message: string) {}
}
