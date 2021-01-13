import Bookshelf from "bookshelf";
import { SqlConnection } from "@ducbaovn/nodejs-common";
import Configuration from "../config";

export class Database extends SqlConnection {
  private static instance: Database;
  private bookshelf: Bookshelf;
  private constructor() {
    super({
      client: "mysql",
      host: Configuration.DATABASE.HOST,
      port: Configuration.DATABASE.PORT,
      user: Configuration.DATABASE.USER,
      password: Configuration.DATABASE.PASSWORD,
      database: Configuration.DATABASE.DB,
      migrationFolder: __dirname + "/../migrations",
    });
    this.bookshelf = Bookshelf(this.instance);
  }
  static getInstance() {
    if (Database.instance == null) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  getBookshelf() {
    return this.bookshelf;
  }
}
