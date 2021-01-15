import { ApiError, ErrorCode, HttpCode } from "@ducbaovn/nodejs-common";
import { ProductModel, PRODUCTS_TABLE_SCHEMA } from "../models";
import { CommonUtils } from "../utils/common.utils";
import { DataTypeUtils } from "../utils/datatypes.utils";
import { BaseDto } from "./base.dto";

export class ProductDto extends BaseDto {
  public name!: string;
  public price!: number;
  public brand!: string;
  public color!: string;
  public description?: string;

  public static fromModel(model: ProductModel, filters: string[]): ProductDto {
    if (model == null) {
      throw new ApiError();
    }
    const dto = new ProductDto();
    dto.id = DataTypeUtils.getString(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.ID));
    dto.isEnable = DataTypeUtils.getBoolean(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.IS_ENABLE));
    dto.isDeleted = DataTypeUtils.getBoolean(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.IS_DELETED));
    dto.createdAt = DataTypeUtils.getDate(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.CREATED_AT));
    dto.updatedAt = DataTypeUtils.getDate(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.UPDATED_AT));
    dto.name = DataTypeUtils.getString(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.NAME));
    dto.price = DataTypeUtils.getNumber(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.PRICE));
    dto.brand = DataTypeUtils.getString(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.BRAND));
    dto.color = DataTypeUtils.getString(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.COLOR));
    dto.description = DataTypeUtils.getString(model.get(PRODUCTS_TABLE_SCHEMA.FIELDS.DESCRIPTION));

    CommonUtils.filter(dto, filters);
    return dto;
  }
  public static toModel(dto: ProductDto): ProductModel {
    const model: any = {};
    if (dto.id != null) {
      model[PRODUCTS_TABLE_SCHEMA.FIELDS.ID] = dto.id;
    }
    if (dto.isDeleted != null) {
      model[PRODUCTS_TABLE_SCHEMA.FIELDS.IS_DELETED] = dto.isDeleted;
    }
    if (dto.isEnable != null) {
      model[PRODUCTS_TABLE_SCHEMA.FIELDS.IS_ENABLE] = dto.isEnable;
    }
    if (dto.description != null) {
      model[PRODUCTS_TABLE_SCHEMA.FIELDS.DESCRIPTION] = dto.description;
    }
    if (dto.name != null) {
      model[PRODUCTS_TABLE_SCHEMA.FIELDS.NAME] = dto.name;
    }
    if (dto.price != null) {
      model[PRODUCTS_TABLE_SCHEMA.FIELDS.PRICE] = dto.price;
    }
    if (dto.brand != null) {
      model[PRODUCTS_TABLE_SCHEMA.FIELDS.BRAND] = dto.brand;
    }
    if (dto.color != null) {
      model[PRODUCTS_TABLE_SCHEMA.FIELDS.COLOR] = dto.color;
    }
    return model;
  }
  public static fromRequest(body: any): ProductDto {
    const { name, price, description, brand, color } = body;
    const product = new ProductDto();
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.color = color;
    return product;
  }
}
