import { AmqpConnection } from "@ducbaovn/nodejs-common";
import Configuration from "../config";

export class Rabbitmq extends AmqpConnection {
  private static instance: Rabbitmq;
  private constructor() {
    super({
      connectionString: Configuration.AMQP_URI,
    });
  }
  static getInstance() {
    if (Rabbitmq.instance == null) {
      Rabbitmq.instance = new Rabbitmq();
    }
    return new Rabbitmq();
  }
}
