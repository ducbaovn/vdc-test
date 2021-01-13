class Configuration {
  static PORT = process.env.PORT;
  static LOG_LEVEL = process.env.LOG_LEVEL;
  static DATABASE = {
    HOST: process.env.MYSQL_HOST,
    PORT: process.env.MYSQL_PORT,
    PASSWORD: process.env.MYSQL_PASSWORD,
    USER: process.env.MYSQL_USER,
    DB: process.env.MYSQL_DB,
  };
  static AMQP = {
    HOST: process.env.AMQP_HOST,
    PORT: process.env.AMQP_PORT,
    USERNAME: process.env.AMQP_USERNAME,
    PASSWORD: process.env.AMQP_PASSWORD,
  };
}

export default Configuration;
