// /src/convert/instant-convert.ts

import { TemporalImpl, type Instant, type PlainDate } from "../core/temporal";
import { getTimeZoneId } from "../core/time-source";

/**
 * Converts a string or `Instant` to a `Instant`.
 *
 * @param value Instant string (ISO) or `Instant`
 * @returns `Instant` representation of the value
 */
export function toInstant(value: string | Instant): Instant {
  if (typeof value !== "string") {
    return value;
  }

  return TemporalImpl.Instant.from(value);
}

/**
 * Converts a string or `Instant` to a `PlainDate` in the
 * active local time zone.
 *
 * @param value Instant string (ISO) or `Instant`
 * @returns `PlainDate` representing the calendar date in local time
 * @example
 * instantToPlainDate("2026-04-07T14:23:00Z"); // PlainDate "2026-04-07"
 */
export function instantToPlainDate(value: string | Instant): PlainDate {
  return toInstant(value).toZonedDateTimeISO(getTimeZoneId()).toPlainDate();
}
