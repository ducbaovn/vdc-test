import * as sourceMapSupport from "source-map-support";
import * as dotenv from "dotenv";
dotenv.config({
  path: __dirname + "/../.env",
});

import { Application } from "@ducbaovn/nodejs-common";
import Configuration from "./config";
import router from "./routers";
import { Database } from "./connections/database";

if (process.env.NODE_ENV !== "production") {
  sourceMapSupport.install();
}
(async () => {
  await Database.getInstance().migration();
  // Bootstrap new app
  new Application({
    router: router,
  }).listen(Configuration.PORT);
})();
