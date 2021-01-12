import { ProductHandler } from "./products.handler";
import * as express from "express";

const router = express.Router();

// prettier-ignore
router.route("/:id")
  .get(ProductHandler.detail)
  .put(ProductHandler.update)
  .delete(ProductHandler.delete);

// prettier-ignore
router.route("/")
  .get(ProductHandler.list)
  .post(ProductHandler.create);

export default router;
