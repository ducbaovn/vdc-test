import momentTz from "moment-timezone";

export class DataTypeUtils {
  public static isDate(item: any): boolean {
    return item instanceof Date && !isNaN(item.valueOf());
  }

  public static isString(item: any): boolean {
    return typeof item === "string" || item instanceof String;
  }

  public static toJSON(val: any): string {
    return JSON.stringify(val);
  }

  public static fromJSON<T>(val: string, defaultVal: T): T {
    try {
      const ret = JSON.parse(val);
      return ret as T;
    } catch (err) {
      return defaultVal;
    }
  }

  public static getTime(val: any, defaultVal: Date): momentTz.Moment {
    if (defaultVal != null) {
      return momentTz(defaultVal, "HH:mm:ss");
    }
    return momentTz(val, "HH:mm:ss");
  }

  public static getDate(val: any, defaultVal?: Date): momentTz.Moment {
    let date: momentTz.Moment;
    if (defaultVal != null) {
      return momentTz.tz(defaultVal, "UTC");
    }
    if (this.isDate(val)) {
      date = momentTz.tz(val, "UTC");
    } else if (val != null) {
      date = momentTz.tz(new Date(val), "UTC");
    } else {
      date = val;
    }
    return date;
  }

  public static getString(val: any, defaultVal?: string): string {
    return val != null && this.isString(val) ? val : defaultVal != null ? defaultVal : undefined;
  }

  public static getArray(val: string[], defaultVal?: string[]): string[] | undefined {
    return val != null && Array.isArray(val) ? val : defaultVal != null ? defaultVal : undefined;
  }

  public static getBoolean(val: any, defaultVal = false): boolean {
    if (val != null) {
      if (typeof val === "string") {
        val = val.toLowerCase();
      }
      switch (val) {
        case true:
        case 1:
        case "yes":
        case "right":
        case "true":
        case "1":
          return true;
        default:
          return false;
      }
    }
    return defaultVal;
  }

  public static getNumber(val: any, defaultVal = 0): number {
    if (val != null) {
      const num = Number(val);
      return isNaN(val) ? defaultVal : num;
    }
    return defaultVal;
  }
}
