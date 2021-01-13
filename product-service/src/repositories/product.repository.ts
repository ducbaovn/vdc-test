import { QueryBuilder } from "knex";
import { CollectionWrap, ProductDto } from "../dtos";
import { ProductModel, PRODUCTS_TABLE_SCHEMA } from "../models";
import BaseRepository from "./base.repository";

export class ProductRepository extends BaseRepository<ProductModel, ProductDto> {
  constructor() {
    super(ProductModel, ProductDto, {
      fromModel: ProductDto.fromModel,
      toModel: ProductDto.toModel,
    });
  }
  private transformOrderBy(field: string): string {
    switch (field) {
      case "price":
        return PRODUCTS_TABLE_SCHEMA.FIELDS.PRICE
      case "brand":
        return PRODUCTS_TABLE_SCHEMA.FIELDS.BRAND
      case "color":
        return PRODUCTS_TABLE_SCHEMA.FIELDS.COLOR
      case "name":
        return PRODUCTS_TABLE_SCHEMA.FIELDS.NAME
      default:
        return PRODUCTS_TABLE_SCHEMA.FIELDS.UPDATED_AT
    }
  }
  public query(searchParams: any = {}, offset?: number, limit?: number, isOrder?: boolean): any {
    const {
      brand,
      color,
      minPrice,
      maxPrice,
      key,
      orderBy = PRODUCTS_TABLE_SCHEMA.FIELDS.UPDATED_AT,
      orderType = "DESC",
    } = searchParams;

    return (q: QueryBuilder): void => {
      q.where(PRODUCTS_TABLE_SCHEMA.FIELDS.IS_DELETED, false);
      if (brand) {
        q.where(PRODUCTS_TABLE_SCHEMA.FIELDS.BRAND, brand);
      }
      if (color) {
        q.where(PRODUCTS_TABLE_SCHEMA.FIELDS.COLOR, color);
      }
      if (minPrice != null && parseInt(minPrice, 10)) {
        q.where(PRODUCTS_TABLE_SCHEMA.FIELDS.PRICE, ">=", parseInt(minPrice, 10));
      }
      if (maxPrice != null && parseInt(maxPrice, 10)) {
        q.where(PRODUCTS_TABLE_SCHEMA.FIELDS.PRICE, "<=", parseInt(maxPrice, 10));
      }
      if (key) {
        q.where((q1: QueryBuilder) => {
          q1.whereRaw(`LOWER(${PRODUCTS_TABLE_SCHEMA.FIELDS.NAME}) LIKE ?`, `%${key.toLowerCase()}%`);
          q1.orWhereRaw(`LOWER(${PRODUCTS_TABLE_SCHEMA.FIELDS.DESCRIPTION}) LIKE ?`, `%${key.toLowerCase()}%`);
        });
      }
      if (offset != null) {
        q.offset(offset);
      }
      if (limit != null) {
        q.limit(limit);
      }
      if (isOrder != null) {
        q.orderBy(this.transformOrderBy(orderBy), orderType);
      }
    };
  }
  public async search(
    searchParams: any = {},
    offset?: number,
    limit?: number,
    related = [],
    filters = [],
  ): Promise<CollectionWrap<ProductDto>> {
    const result = await this.countAndQuery(
      this.query(searchParams),
      this.query(searchParams, offset, limit, true),
      related,
      filters,
    );
    result.offset = offset;
    result.limit = limit;
    return result;
  }
}
export default ProductRepository;
