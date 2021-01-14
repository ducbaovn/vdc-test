import express from "express";
import helmet from "helmet";
import * as http from "http";
import { cors, httpLog, httpError, notFound, recover, logger } from "./middlewares";
import { json, urlencoded } from "body-parser";

export interface AppConfig {
  router?: express.Router;
  logLevel?: string;
}

export class Application {
  private opts: AppConfig;
  private app: express.Express;
  private bind!: number;
  private server!: http.Server;

  constructor(opts?: AppConfig) {
    this.opts = opts !== null ? { ...opts } : {};
    this.app = express();
    this.app.enable("case sensitive routing");
    this.app.enable("trust proxy");
    this.app.disable("x-powered-by");
    this.app.disable("etag");

    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(logger(opts?.logLevel));
    this.app.use(httpLog());
    if (opts?.router) {
      this.app.use("/", opts.router);
    }
    this.app.use(notFound());
    this.app.use(httpError());
    this.app.use(recover());
    process.on("unhandledRejection", (reason: any): void => {
      console.error("unhandledRejection: " + reason);
    });
    process.on("uncaughtException", (err: Error): void => {
      console.error(err.message, err);
      // Note: When this happen, the process should be terminated
      // process.exit(1);
    });
  }

  public listen(port: any) {
    console.info("Wait for others components become available");
    if (port != null) {
      const portNumber = parseInt(port, 10) || 3000;
      this.bind = portNumber;
    } else {
      this.bind = 3000;
    }
    this.app.set("port", this.bind);
    this.server = http.createServer(this.app);
    this.server.on("error", this.onError.bind(this));
    this.server.on("listening", this.onListening.bind(this));
    this.server.listen(this.bind);
  }

  private onListening() {
    const addr = this.server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
    console.info("Listening on " + bind);
  }

  private onError(error: any) {
    if (error.syscall !== "listen") {
      throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(this.bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(this.bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  get express(): express.Express {
    return this.app
  }
}

export default Application;
