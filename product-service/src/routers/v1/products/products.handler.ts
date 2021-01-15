import * as express from "express";
import { HttpCode } from "@ducbaovn/nodejs-common";
import { ProductService } from "../../../services";
import { ProductDto } from "../../../dtos";

export class ProductHandler {
  public static async create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const product = ProductDto.fromRequest(req.body);
      await ProductService.insert(product);
      res.status(HttpCode.OK);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  public static async detail(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = await ProductService.detail(id);
      res.status(HttpCode.OK);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = ProductDto.fromRequest(req.body);
      await ProductService.update(id, product);
      res.status(HttpCode.OK);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await ProductService.delete(id);
      res.status(HttpCode.OK);
      res.json({ id });
    } catch (error) {
      next(error);
    }
  }

  public static async list(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const offset = parseInt(req.query.offset as string, 10) || 0;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const queryParams = req.query;

      const list = await ProductService.list(queryParams, offset, limit);
      res.status(HttpCode.OK);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductHandler;
