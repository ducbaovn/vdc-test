export class CommonUtils {
  public static filter(val: any, filters: string[] = []): void {
    if (val != null) {
      filters.forEach((field) => {
        if (val.hasOwnProperty(field)) {
          val[field] = undefined;
        }
      });
    }
  }
}
