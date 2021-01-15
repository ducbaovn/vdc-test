import { ProductHandler } from "./products.handler";
import * as express from "express";
import { bodyValidatorMiddleware } from "../../../middlewares";
import { createProductSchema, updateProductSchema } from "../../../validators";

const router = express.Router();

// prettier-ignore
router.route("/:id")
  .get(ProductHandler.detail)
  .put(bodyValidatorMiddleware(updateProductSchema), ProductHandler.update)
  .delete(ProductHandler.delete);

// prettier-ignore
router.route("/")
  .get(ProductHandler.list)
  .post(bodyValidatorMiddleware(createProductSchema), ProductHandler.create);

export default router;
