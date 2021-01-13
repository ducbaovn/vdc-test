import * as winston from "winston";
import * as uuid from "uuid";

export class Log {
  constructor(
    public time: string,
    public message: any,
    public level: string,
    public context?: any,
    public url?: string,
    public path?: string,
    public correlationId?: string,
  ) {}
}

export class LoggerService {
  private _level = "info";
  private _correlationId: string = uuid.v4();
  public logger: winston.Logger;
  constructor(options?: { level: string; correlationId?: string }) {
    this._level = options?.level || "info";
    this._correlationId = options?.correlationId || uuid.v4();
    this.logger = winston.createLogger({
      level: this._level,
      format: winston.format.printf(({ message }) => message),
      transports: [new winston.transports.Console({ level: this._level })],
    });
  }

  get correlationId(): string {
    return this._correlationId;
  }

  error(message: any, context?: any): void {
    this.write("error", message, context);
  }

  warn(message: any, context?: any): void {
    this.write("warn", message, context);
  }

  log(message: any, context?: any): void {
    this.write("info", message, context);
  }

  verbose(message: any, context?: any): void {
    this.write("verbose", message, context);
  }

  debug(message: any, context?: any): void {
    this.write("debug", message, context);
  }

  write(level: string, message: any, context?: any): void {
    const localeStringOptions = {
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "2-digit",
      month: "2-digit",
    };
    const timestamp = new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
    const log = new Log(timestamp, this.format(message), level);
    if (this.correlationId) {
      log.correlationId = this.correlationId;
    }
    log.context = this.format(context);
    this.logger.log(level, JSON.stringify(log));
  }

  private format(message: any) {
    if (message instanceof Error) {
      return {
        name: message.name,
        message: message.message,
        stack: message.stack,
      };
    }
    return message;
  }
}
