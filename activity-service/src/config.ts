class Configuration {
  static LOG_LEVEL = process.env.LOG_LEVEL;
  static DATABASE = {
    URI: process.env.MONGODB_URI,
    DB: process.env.MONGODB_DATABASE,
  };
  static AMQP_URI = process.env.AMQP_URI;
}

export default Configuration;
