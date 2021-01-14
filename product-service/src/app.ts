import * as dotenv from "dotenv";
dotenv.config({
  path: __dirname + "/../.env",
});

import { Application } from "@ducbaovn/nodejs-common";
import Configuration from "./config";
import router from "./routers";
import { Database } from "./connections/database";

const bootstrap = async () => {
  await Database.getInstance().migration();
  if (process.env.NODE_ENV === 'test') {
    await Database.getInstance().seed();
  }
  // Bootstrap new app
  const app = new Application({
    router: router,
  })
  app.listen(Configuration.PORT);
  return app.express
}
export default bootstrap
