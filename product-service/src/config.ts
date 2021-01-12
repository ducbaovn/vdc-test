class Configuration {
  static PORT = process.env.PORT;
  static LOG_LEVEL = process.env.LOG_LEVEL;
  static DATABASE = {
    HOST: process.env.MYSQL_HOST,
    PASSWORD: process.env.MYSQL_PASSWORD,
    USER: process.env.MYSQL_USER,
    DB: process.env.MYSQL_DB,
  };
  static AMQP_URI = process.env.AMQP_URI;
}

export default Configuration;
