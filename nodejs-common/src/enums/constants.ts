export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export const HEADERS = {
  CONTENT_LENGTH: "content-length",
  CONTENT_TYPE: "content-type",
  CORRELATION_ID: "x-correlation-id",
};

export const CONTENT_TYPE = {
  JSON: "application/json",
  JSON_PROBLEM: "application/problem+json",
  FORM_URLENCODED: "application/x-www-form-urlencoded",
};
