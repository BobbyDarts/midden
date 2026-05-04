// /src/convert/date-convert.ts

import { type PlainTime, TemporalImpl, type PlainDate } from "../core/temporal";

/**
 * Converts a string or `PlainDate` to a `PlainDate`.
 *
 * @param value Date string (ISO) or `PlainDate`
 * @returns `PlainDate` representation of the value
 */
export function toPlainDate(value: string | PlainDate): PlainDate {
  if (typeof value !== "string") {
    return value;
  }

  return TemporalImpl.PlainDate.from(value);
}

/**
 * Converts a string or `PlainTime` to a `PlainTime`.
 *
 * @param value Date string (ISO) or `PlainTime`
 * @returns `PlainTime` representation of the value
 */
export function toPlainTime(value: string | PlainTime): PlainTime {
  if (typeof value !== "string") {
    return value;
  }

  return TemporalImpl.PlainTime.from(value);
}
