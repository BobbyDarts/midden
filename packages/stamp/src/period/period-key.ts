// /src/period/period-key.ts

import type { PeriodUnit } from "./types";
import { instantToPlainDate } from "../convert/instant-convert";
import type { Instant } from "../core/temporal";

/**
 * Derives a grouping key from a timestamp for a given period unit.
 * Used to bucket timestamps into day, week, or month groups for charting.
 *
 * - `"day"` — returns the ISO date string (`"2026-04-07"`)
 * - `"week"` — returns the ISO date of the Monday of that week (`"2026-04-06"`)
 * - `"month"` — returns the year and zero-padded month (`"2026-04"`)
 *
 * @param timestamp Instant string (ISO) or `Instant`
 * @param unit The period unit to group by
 * @returns A sortable string key representing the period
 * @example
 * toPeriodKey("2026-04-07T14:23:00Z", "day");   // "2026-04-07"
 * toPeriodKey("2026-04-07T14:23:00Z", "week");  // "2026-04-06"
 * toPeriodKey("2026-04-07T14:23:00Z", "month"); // "2026-04"
 */
export function toPeriodKey(
  timestamp: string | Instant,
  unit: PeriodUnit,
): string {
  const date = instantToPlainDate(timestamp);

  switch (unit) {
    case "day":
      return date.toString();

    case "month":
      return `${date.year}-${String(date.month).padStart(2, "0")}`;

    case "week": {
      const monday = date.subtract({
        days: date.dayOfWeek - 1,
      });
      return monday.toString();
    }

    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }
}
