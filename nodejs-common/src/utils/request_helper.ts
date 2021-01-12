import * as _ from "lodash";
import got, { Method } from "got";
import { HTTP_METHOD, HEADERS, CONTENT_TYPE } from "../enums";
import FormData from "form-data";
import { Duplex } from "stream";
import { Agent } from "https";

export interface ReqOptions {
  body?: any;
  headers?: any;
  searchParams?: any;
  basicAuth?: {
    username: string;
    password: string;
  };
  p12Auth?: {
    pfx: Buffer;
    passphrase: string;
  };
  timeout?: number;
  retry?: number;
}

export class ResponseDto {
  constructor(public statusCode: number, public body: any, public headers: any) {}
}

export class RequestHelper {
  public static async get(url: string, options: ReqOptions = {}): Promise<ResponseDto> {
    return this.send(HTTP_METHOD.GET, url, options);
  }

  public static async post(url: string, body: any, options: ReqOptions = {}): Promise<ResponseDto> {
    return this.send(HTTP_METHOD.POST, url, { body: body, ...options });
  }

  public static async put(url: string, body: any, options: ReqOptions = {}): Promise<ResponseDto> {
    return this.send(HTTP_METHOD.PUT, url, { body: body, ...options });
  }

  public static async delete(url: string, options: ReqOptions = {}): Promise<ResponseDto> {
    return this.send(HTTP_METHOD.DELETE, url, options);
  }

  public static async patch(url: string, body: any, options: ReqOptions = {}): Promise<ResponseDto> {
    return this.send(HTTP_METHOD.PATCH, url, { body, ...options });
  }

  public static stream(method: Method, url: string, options: ReqOptions = {}): Duplex {
    return got.stream(url, {
      method: method,
      headers: options.headers,
      searchParams: options.searchParams,
      throwHttpErrors: false,
    });
  }

  public static async send(method: Method, url: string, options: ReqOptions = {}): Promise<ResponseDto> {
    const { headers, body, searchParams, basicAuth, p12Auth, timeout, retry, form } = RequestHelper.buildRequestParams(
      options,
    );
    const sendOpts: any = {
      method: method,
      headers: headers,
      throwHttpErrors: false,
      searchParams: searchParams,
      timeout,
      retry,
    };
    if (method.toUpperCase() !== "GET") {
      sendOpts.form = form || undefined;
      sendOpts.body = body || undefined;
    }
    if (basicAuth != null) {
      _.extend(sendOpts, basicAuth);
    }
    if (p12Auth != null) {
      _.extend(sendOpts, {
        agent: {
          https: new Agent(p12Auth),
        },
      });
    }
    const res = await got(url, sendOpts);
    const resDto = RequestHelper.transform(res);
    return resDto;
  }

  private static buildRequestParams(options: ReqOptions = {}) {
    const headers = options.headers || {};
    const contentTypeKey = _.findKey(headers, (_value: any, key: string) => key.toLowerCase() === HEADERS.CONTENT_TYPE);
    const contentType = contentTypeKey ? headers[contentTypeKey] : null;
    if (!contentType) {
      headers[HEADERS.CONTENT_TYPE] = CONTENT_TYPE.JSON;
    }
    const bodyName = options.body && options.body.constructor ? options.body.constructor.name : "";
    let body, form: any;
    if (bodyName === FormData.name) {
      body = options.body;
      _.extend(headers, (body as FormData).getHeaders());
    } else if (contentType === CONTENT_TYPE.FORM_URLENCODED) {
      form = options.body;
    } else {
      body = _.isObject(options.body) ? JSON.stringify(options.body) : options.body;
    }
    return {
      body: body,
      headers: headers,
      searchParams: options.searchParams,
      basicAuth: options.basicAuth,
      p12Auth: options.p12Auth,
      timeout: options.timeout || undefined,
      retry: options.retry || undefined,
      form: form,
    };
  }

  private static transform(res: any): ResponseDto {
    const resDto = new ResponseDto(res.statusCode, res.body, res.headers);
    try {
      resDto.body = JSON.parse(res.body);
    } catch (e) {}
    return resDto;
  }
}
