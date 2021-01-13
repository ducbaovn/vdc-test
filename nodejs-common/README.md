# NodeJS Common Library
Name: @ducbaovn/nodejs-common
Current Version: 1.0.1
## Connections
1. AMQP Connection:
- This class is for establish connection to AMQP server.
- Implementing publish-subscribe pattern for asynchronous inter-service communication among services
```
export declare class AmqpConnection {
    protected channel: Channel;
    protected config: AmqpConfig;
    protected constructor(config?: AmqpConfig);
    get connectionString(): string;
    static connect(config?: AmqpConfig): Promise<AmqpConnection>;
    publishTopic(exchange: string, key: string, msg: string): Promise<void>;
    consumeTopic(exchange: string, keys: string[], cb: (msg: ConsumeMessage | null) => void): Promise<void>;
}
```
2. MongoDB Connection:
- This class is for establish connection to MongoDB server.
- Using in service which do not need fixed schema and do not need strong consistency such as our activity-service
```
export declare class MongoDbConnection {
    protected mongoClient: Db;
    protected config: MongoDbConfig;
    constructor(config?: MongoDbConfig);
    getClient(): Db;
    get connectionString(): string;
    connect(): Promise<void>;
}
```
3. MySQL Connection:
- This class is for establish connection to MySQL server.
- Using in service which need fixed-relational schema, strong consistency, such as our product-service
```
export declare class SqlConnection {
    protected instance: Knex;
    protected config: SqlConfig;
    constructor(config?: SqlConfig);
    migration(): Promise<void>;
}
```
## Enums
Sharing constants for all services
## Errors
Custom Exception Class for consistent error http response
```
export declare class ApiError implements Error {
    name: string;
    stack: any;
    message: string;
    code: string;
    httpStatus: number;
    rawError: Error;
    static fromError(error: Error, errorCode?: ErrorCode, httpStatus?: number, stack?: boolean): ApiError;
    constructor(errorCode?: ErrorCode, httpStatus?: number, stack?: boolean);
    toString(): string;
    toErrorCode(): ErrorCode;
}
```
## Middlewares
1. CORS: Set response headers to support CORS
2. Http Log: Logging Http Request Information: method, url, duration, http status, correlationId. We should use this middleware after Log Middleware
3. Log Middleware: init our custom Logger Service
4. Not Found Middleware: fallback to this middleware if route is not define in routers
5. Recover: fallback unhandled exception to our custom exception
## Services
1. Logger Service: custom logger support correlationId
```
export declare class LoggerService {
    private _level;
    private _correlationId;
    logger: winston.Logger;
    constructor(options?: {
        level: string;
        correlationId?: string;
    });
    get correlationId(): string;
    error(message: any, context?: any): void;
    warn(message: any, context?: any): void;
    log(message: any, context?: any): void;
    verbose(message: any, context?: any): void;
    debug(message: any, context?: any): void;
    write(level: string, message: any, context?: any): void;
    private format;
}
```
## Utils
1. Request Helper:
- Wrapper of got library. It introduces simplier interface than got
- Use for synchronous inter-service communication between services
```
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
export declare class ResponseDto {
    statusCode: number;
    body: any;
    headers: any;
    constructor(statusCode: number, body: any, headers: any);
}
export declare class RequestHelper {
    static get(url: string, options?: ReqOptions): Promise<ResponseDto>;
    static post(url: string, body: any, options?: ReqOptions): Promise<ResponseDto>;
    static put(url: string, body: any, options?: ReqOptions): Promise<ResponseDto>;
    static delete(url: string, options?: ReqOptions): Promise<ResponseDto>;
    static patch(url: string, body: any, options?: ReqOptions): Promise<ResponseDto>;
    static stream(method: Method, url: string, options?: ReqOptions): Duplex;
    static send(method: Method, url: string, options?: ReqOptions): Promise<ResponseDto>;
    private static buildRequestParams;
    private static transform;
}
```
## Express Application
Wrapper Express Http Server. It has already installed some middlewares that I think they are will be used across services