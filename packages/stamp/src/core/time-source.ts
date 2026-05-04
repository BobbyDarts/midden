// /src/core/time-source.ts

import { type PlainDate, type Instant, TemporalImpl } from "./temporal";

/**
 * Interface representing a source of time.
 */
export interface TimeSource {
  /**
   * Returns the current instant in time (UTC).
   */
  now(): Instant;

  /**
   * Returns the current calendar date (year, month, day).
   */
  today(): PlainDate;

  /**
   * Returns the current time zone ID.
   * Example: `"America/New_York"`.
   */
  timeZoneId(): string;
}

/**
 * Partially overrides the current time source.
 * Useful for mocking `now`, `today`, or `timeZoneId` in tests.
 *
 * @param source Partial `TimeSource` to override specific methods.
 * @example
 * setTimeSource({ today: () => PlainDate.from("2026-02-19") });
 */
export function setTimeSource(source: Partial<TimeSource>) {
  currentTimeSource = {
    ...currentTimeSource,
    ...source,
  };
}

/**
 * Resets the time source back to the default system clock.
 */
export function resetTimeSource() {
  currentTimeSource = systemTimeSource;
}

/**
 * Default system-based time source.
 */
export const systemTimeSource: TimeSource = {
  now: () => TemporalImpl.Now.instant(),
  today: () => TemporalImpl.Now.zonedDateTimeISO().toPlainDate(),
  timeZoneId: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
};

/** Current active time source. Defaults to systemTimeSource. */
let currentTimeSource: TimeSource = systemTimeSource;

/**
 * Returns the current instant in time (UTC) according to the active time source.
 *
 * @returns `Instant` representing the current UTC time.
 * @example
 * const now = getNow();
 * console.log(now.toString()); // "2026-02-19T15:00:00Z"
 */
export function getNow(): Instant {
  return currentTimeSource.now();
}

/**
 * Overrides the current instant returned by `getNow`.
 * Useful for testing or simulating a specific moment in time.
 *
 * @param now `Instant` to use as the current time.
 */
export function setNow(now: Instant) {
  const today = now.toZonedDateTimeISO(getTimeZoneId()).toPlainDate();

  setTimeSource({
    now: () => now,
    today: () => today,
  });
}

/**
 * Returns the current calendar date according to the active time source.
 *
 * @returns `PlainDate` representing the current date.
 * @example
 * const today = getToday();
 * console.log(today.toString()); // "2026-02-19"
 */
export function getToday(): PlainDate {
  return currentTimeSource.today();
}

/**
 * Returns the current time zone ID of the active time source.
 *
 * @returns string, e.g., `"America/New_York"`.
 */
export function getTimeZoneId(): string {
  return currentTimeSource.timeZoneId();
}

/**
 * Overrides the current time zone ID returned by `getTimeZoneId`.
 *
 * @param timeZoneId String representing the time zone, e.g., `"America/New_York"`.
 */
export function setTimeZoneId(timeZoneId: string) {
  setTimeSource({ timeZoneId: () => timeZoneId });
}
