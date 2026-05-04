// /src/format/local-format.ts

import { TemporalImpl, type Instant, type PlainDate } from "../core/temporal";
import { getTimeZoneId } from "../core/time-source";

/**
 * Formats a `Instant` in the local time of the active time zone.
 *
 * @param instant `Instant` to format.
 * @param options Optional `Intl.DateTimeFormatOptions` for customizing output.
 * @returns A string representing the instant in local time.
 * @example
 * const instant = Instant.from("2026-02-19T15:00:00Z");
 * formatLocal(instant); // "2/19/2026, 10:00:00 AM" (Eastern Time)
 * formatLocal(instant, { hour: "2-digit", minute: "2-digit" }); // "10:00 AM"
 */
export function formatLocal(
  instant: Instant,
  options?: Intl.DateTimeFormatOptions,
): string {
  const zoned = instant.toZonedDateTimeISO(getTimeZoneId());
  return zoned.toLocaleString(undefined, options);
}

/**
 * Converts a `PlainDate` to a string using the system's local time zone.
 *
 * @param plainDate `PlainDate` to display.
 * @param options Optional `Intl.DateTimeFormatOptions` for customizing output.
 * @returns A string representing the date in local time.
 * @example
 * const date = PlainDate.from("2026-02-19");
 * displayDate(date); // "2/19/2026"
 * displayDate(date, { weekday: "short", month: "long", day: "numeric" }); // "Thu, February 19"
 */
export function displayDate(
  plainDate: PlainDate,
  options?: Omit<Intl.DateTimeFormatOptions, "dateStyle" | "timeStyle">,
): string {
  // Convert PlainDate to ZonedDateTime at local midnight
  const zdt = plainDate.toZonedDateTime({
    plainTime: TemporalImpl.PlainTime.from("00:00"),
    timeZone: getTimeZoneId(),
  });

  return zdt.toLocaleString(undefined, options);
}
