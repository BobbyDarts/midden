// /src/compare/instant-compare.ts

import { toInstant } from "../convert/instant-convert";
import { TemporalImpl, type Instant } from "../core/temporal";

/**
 * Compares two instants (string or `Instant`).
 *
 * @returns -1 if a < b, 0 if equal, 1 if a > b
 */
export function compareInstants(
  a: string | Instant,
  b: string | Instant,
): number {
  return TemporalImpl.Instant.compare(toInstant(a), toInstant(b));
}

/**
 * Returns true if `a` is after `b`.
 */
export function isAfter(a: string | Instant, b: string | Instant): boolean {
  return compareInstants(a, b) > 0;
}

/**
 * Returns true if `a` is before `b`.
 */
export function isBefore(a: string | Instant, b: string | Instant): boolean {
  return compareInstants(a, b) < 0;
}

/**
 * Returns true if `a` is equal to `b`.
 */
export function isEqual(a: string | Instant, b: string | Instant): boolean {
  return compareInstants(a, b) === 0;
}
