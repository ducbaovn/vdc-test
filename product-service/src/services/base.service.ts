import * as Bluebird from "bluebird";
import { WithRelatedQuery } from "bookshelf";
import { BaseDto } from "../dtos/base.dto";
import BaseRepository from "../repositories/base.repository";

export class BaseService<M extends BaseDto, R extends BaseRepository<any, M>> {
  private repo: R;

  constructor(repo: R) {
    this.repo = repo;
  }

  public async findOne(id: string, related: string[] = [], filters: string[] = []): Promise<M> {
    return this.repo.findOne(id, related, filters);
  }

  public async delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}

export default BaseService;
