import { BaseModel } from "./base.model";

export const PRODUCTS_TABLE_SCHEMA = {
  TABLE_NAME: "products",
  FIELDS: {
    ID: "id",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
    IS_ENABLE: "is_enable",
    IS_DELETED: "is_deleted",
    NAME: "name",
    PRICE: "price",
    BRAND: "brand",
    COLOR: "color",
    DESCRIPTION: "description",
  },
};

export class ProductModel extends BaseModel<ProductModel> {
  get tableName(): string {
    return PRODUCTS_TABLE_SCHEMA.TABLE_NAME;
  }
}
