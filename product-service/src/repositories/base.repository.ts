import { QueryBuilder, Transaction } from "knex";
import { BaseModel } from "../models/base.model";
import { BaseDto } from "../dtos/base.dto";
import { ApiError, ErrorCode, HttpCode } from "@ducbaovn/nodejs-common";
import { CollectionWrap } from "../dtos/collection_wrap";

export class BaseRepository<T extends BaseModel<T>, X extends BaseDto> {
  constructor(
    protected model: { new (attributes?: any, isNew?: boolean): T },
    protected dto: { new (): X },
    protected converter: {
      toModel: (data: X) => any;
      fromModel: (data: any, filters: string[]) => X;
    },
  ) {}

  public async update(data: X, t?: Transaction): Promise<X> {
    if (data == null || data.id == null || data.id == "") {
      throw new ApiError(ErrorCode.MISSING_PARAMETERS, HttpCode.BAD_REQUEST);
    }
    const ins = this.converter.toModel(data);
    return new this.model({ id: ins.id }).save(ins, {
      patch: true,
      transacting: t,
    });
  }

  public async insert(data: X, t?: Transaction): Promise<X> {
    if (data == null) {
      throw new ApiError();
    }
    const ins = this.converter.toModel(data);
    const model = await new this.model().save(ins, {
      transacting: t,
    });
    data.id = model.id;
    return data;
  }

  public async delete(id: string, t?: Transaction): Promise<void> {
    if (!id) {
      throw new ApiError();
    }
    const object = await this.findOne(id);
    if (object != null) {
      return new this.model({ id: id }).save(
        { is_deleted: 1 },
        {
          patch: true,
          transacting: t,
        },
      );
    }
  }

  public async updateByQuery(callback: (qb: QueryBuilder) => void, data: any, t?: Transaction): Promise<T> {
    return new this.model({}, false).query(callback).save(data, {
      method: "update",
      patch: true,
      require: false,
      transacting: t,
    });
  }

  public async findAll(ids: string[], related: string[] = [], filters: string[] = []): Promise<X[]> {
    const dto = new this.model();
    const objects = await dto
      .query((q): void => {
        if (ids != null && ids.length > 0) {
          q.whereIn(dto.idProperty, ids);
        }
        q.where(dto.isDelete, false);
      })
      .fetchAll({ withRelated: related });
    const ret: X[] = [];
    if (objects != null && objects.models != null && Array.isArray(objects.models)) {
      objects.models.forEach((object: any) => {
        const model = this.converter.fromModel(object, filters);
        if (model != null) {
          ret.push(model);
        }
      });
    }
    return ret;
  }

  public async findOne(id: string, related: string[] = [], filters: string[] = []): Promise<X> {
    if (id == null || id === "") {
      throw new ApiError();
    }

    const objects = await this.findAll([id], related, filters);
    return objects[0];
  }

  public async countByQuery(callback: (qb: QueryBuilder) => void): Promise<number> {
    if (callback == null) {
      return 0;
    }
    const total = await new this.model().query(callback).count();
    return Number(total);
  }

  public async countFetchByQuery(callback: (qb: QueryBuilder) => void): Promise<number> {
    if (callback == null) {
      return Promise.resolve(0);
    }
    const items = await new this.model().query(callback).fetchAll();
    return items.length;
  }

  public async findByQuery(
    callback: (qb: QueryBuilder) => void,
    related: string[] = [],
    filters: string[] = [],
  ): Promise<X[]> {
    const items = await new this.model().query(callback).fetchAll({ withRelated: related });
    const ret: X[] = [];
    if (items != null && Array.isArray(items.models))
      items.models.forEach((item: any) => {
        const temp = this.converter.fromModel(item, filters);
        if (temp != null) {
          ret.push(temp);
        }
      });
    return ret;
  }

  public async findOneByQuery(
    callback: (qb: QueryBuilder) => void,
    related: string[] = [],
    filters: string[] = [],
  ): Promise<X> {
    const item = await new this.model().query(callback).fetch({ withRelated: related });
    if (item != null) {
      return this.converter.fromModel(item, filters);
    }
    return item;
  }

  public async countAndQuery(
    countQuery: (qb: QueryBuilder) => void,
    findQuery: (qb: QueryBuilder) => void,
    related: string[] = [],
    filters: string[] = [],
  ): Promise<CollectionWrap<X>> {
    const ret = new CollectionWrap<X>();
    ret.total = await this.countByQuery(countQuery);
    ret.data = await this.findByQuery(findQuery, related, filters);
    return ret;
  }
}

export default BaseRepository;
