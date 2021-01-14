import bootstrap from "./app";
import * as sourceMapSupport from "source-map-support";

if (process.env.NODE_ENV !== "production") {
  sourceMapSupport.install();
}
bootstrap()
