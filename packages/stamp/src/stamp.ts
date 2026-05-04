// /src/stamp.ts

import { isAfter, isBefore } from "./compare/instant-compare";
import { toPlainDate } from "./convert/date-convert";
import { toInstant } from "./convert/instant-convert";
import { TemporalImpl, type Instant, type PlainDate } from "./core/temporal";
import { getNow, getToday } from "./core/time-source";

/**
 * Temporal rules (project conventions):
 * - Store application dates/times in UTC whenever possible.
 * - Use `PlainDate` for calendar-only values (appliedDate, dueDate).
 * - Use `Instant` for timestamp values (createdAt, updatedAt).
 * - Convert to local time zone only for display with `displayDate` or `formatLocal`.
 * - Use `toPlainDate` and `toInstant` for parsing/normalizing input.
 */

/**
 * Returns the current day as an ISO string.
 *
 * @returns string in "YYYY-MM-DD" format representing today.
 */
export function todayIso(): string {
  return getToday().toString();
}

/**
 * Returns now as an ISO string in UTC.
 *
 * @returns string in ISO 8601 format representing the current instant in UTC.
 */
export function nowIso(): string {
  return getNow().toString();
}

/**
 * Checks if the given ISO date string represents today.
 *
 * @param isoDate ISO date string (YYYY-MM-DD)
 * @returns true if the date matches today, false otherwise
 */
export function isSameDayIso(isoDate: string): boolean {
  return toPlainDate(isoDate).equals(getToday());
}

/**
 * Compares two plain dates (string or PlainDate).
 *
 * @returns -1 if a < b, 0 if equal, 1 if a > b
 */
export function comparePlainDate(
  a: string | PlainDate,
  b: string | PlainDate,
): number {
  return TemporalImpl.PlainDate.compare(toPlainDate(a), toPlainDate(b));
}

/**
 * Returns the latest instant from a list of strings or Instant objects.
 *
 * @param instants Array of timestamps (string ISO or Instant)
 * @returns The Instant that is the latest, or null if array is empty
 */
export function maxInstant(instants: (string | Instant)[]): Instant | null {
  if (instants.length === 0) return null;

  return instants
    .map(toInstant)
    .reduce((max, curr) => (isAfter(curr, max) ? curr : max));
}

/**
 * Returns the earliest instant from a list of strings or Instant objects.
 *
 * @param instants Array of timestamps (string ISO or Instant)
 * @returns The Instant that is the earliest, or null if array is empty
 */
export function minInstant(instants: (string | Instant)[]): Instant | null {
  if (instants.length === 0) return null;

  return instants
    .map(toInstant)
    .reduce((min, curr) => (isBefore(curr, min) ? curr : min));
}
