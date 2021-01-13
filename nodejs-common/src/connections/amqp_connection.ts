import amqp, { Channel, ConsumeMessage } from "amqplib";
import waitOn from "wait-on";

export interface AmqpConfig {
  host?: string;
  port?: string;
  username?: string;
  password?: string;
}

export class AmqpConnection {
  protected channel!: Channel;
  protected config: AmqpConfig;

  protected constructor(config?: AmqpConfig) {
    const defaultConf: any = {
      host: "localhost",
      port: 5672,
      username: "guest",
      password: "guest",
    };
    const conf = Object.assign({}, defaultConf, config || {});

    this.config = conf;
  }

  get connectionString() {
    const { username, password, host, port } = this.config;
    return `amqp://${username}:${password}@${host}:${port}`;
  }

  public static async connect(config?: AmqpConfig): Promise<AmqpConnection> {
    const conn = new AmqpConnection(config);
    console.info(`Waiting for AMQP server on ${conn.connectionString}`);
    await waitOn({
      resources: [`tcp:${conn.config.host}:${conn.config.port}`],
      timeout: 30000,
      tcpTimeout: 10000,
    });
    console.info(`Connecting to AMQP server...`);
    const client = await amqp.connect(conn.connectionString as string);
    conn.channel = await client.createChannel();
    return conn;
  }

  public async publishTopic(exchange: string, key: string, msg: string): Promise<void> {
    console.info(`Publish msg to topic ${exchange}-${key}`);
    await this.channel.assertExchange(exchange, "topic", {
      durable: true,
    });
    await this.channel.publish(exchange, key, Buffer.from(msg));
  }

  public async consumeTopic(exchange: string, keys: string[], cb: (msg: ConsumeMessage | null) => void): Promise<void> {
    await this.channel.assertExchange(exchange, "topic", {
      durable: true,
    });

    const q = await this.channel.assertQueue("", {
      exclusive: true,
    });

    keys.forEach((key) => {
      this.channel.bindQueue(q.queue, exchange, key);
    });
    console.info(` [*] Consume topic ${exchange}-${keys}. Waiting for logs.`);
    this.channel.consume(q.queue, cb, {
      noAck: true,
    });
  }
}
