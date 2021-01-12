import * as UUID from "uuid";
import { Database } from "../connections/database";

export abstract class BaseModel<T> extends Database.getInstance().getBookshelf().Model<any> {
  private static generateUuid(model: any): void {
    if (model.isNew()) {
      model.set(model.idAttribute, UUID.v4());
    }
  }

  constructor(attributes?: any, isNew?: boolean) {
    super(attributes);
    if (isNew != null) {
      this.isNew = () => {
        return isNew;
      };
    }
  }

  get idProperty(): string {
    return "id";
  }

  get isDelete(): string {
    return "is_deleted";
  }

  get hasTimestamps(): string[] {
    return ["created_at", "updated_at"];
  }

  public initialize(): void {
    this.on("saving", BaseModel.generateUuid);
  }
}
