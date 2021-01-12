export class CollectionWrap<T> {
  public data: T[] = [];
  public total = 0;
  public offset?: number = undefined;
  public limit?: number = undefined;
}
