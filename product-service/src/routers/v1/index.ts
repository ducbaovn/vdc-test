import * as express from "express";
import { activityMiddleware } from "../../middlewares/activity.middleware";
import { bodyValidatorMiddleware } from "../../middlewares";
import productRouters from "./products/products.router";

const router = express.Router();

router.use("/products", activityMiddleware("products"), productRouters);

export default router;
