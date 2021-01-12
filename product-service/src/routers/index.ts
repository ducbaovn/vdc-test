import * as express from "express";
import apiV1 from "./v1";

const router = express.Router();

router.get("/ping", (req, res, next) => {
  res.end();
});

router.use("/api/v1", apiV1);

export default router;
