import momentTz from "moment-timezone";

export abstract class BaseDto {
  public id!: string;
  public createdAt!: momentTz.Moment;
  public updatedAt!: momentTz.Moment;
  public isEnable!: boolean;
  public isDeleted!: boolean;
}
