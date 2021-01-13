class Configuration {
  static LOG_LEVEL = process.env.LOG_LEVEL;
  static DATABASE = {
    HOST: process.env.MONGODB_HOST,
    PORT: process.env.MONGODB_PORT,
    USERNAME: process.env.MONGODB_USERNAME,
    PASSWORD: process.env.MONGODB_PASSWORD,
    DB: process.env.MONGODB_DATABASE,
  };
  static AMQP = {
    HOST: process.env.AMQP_HOST,
    PORT: process.env.AMQP_PORT,
    USERNAME: process.env.AMQP_USERNAME,
    PASSWORD: process.env.AMQP_PASSWORD,
  };
}

export default Configuration;
