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

  public query(searchParams: any = {}, offset?: number, limit?: number, isOrder?: boolean): any {
    const { key, orderBy = PRODUCTS_TABLE_SCHEMA.FIELDS.UPDATED_AT, orderType = "ASC" } = searchParams;

    return (q: QueryBuilder): void => {
      q.where(PRODUCTS_TABLE_SCHEMA.FIELDS.IS_DELETED, false);
      if (key != null) {
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
        q.orderBy(orderBy, orderType);
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
