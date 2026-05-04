// /src/period/period-key.test.ts

import { describe, it, expect, beforeEach } from "vitest";

import { toPeriodKey } from "./period-key";
import { toInstant } from "../convert/instant-convert";
import { setTimeZoneId, resetTimeSource } from "../core/time-source";

describe("toPeriodKey", () => {
  beforeEach(() => {
    setTimeZoneId("America/New_York");
    return () => resetTimeSource();
  });

  it("returns ISO date string for 'day' unit", () => {
    expect(toPeriodKey("2026-04-07T14:23:00Z", "day")).toBe("2026-04-07");
  });

  it("returns year-month string for 'month' unit", () => {
    expect(toPeriodKey("2026-04-07T14:23:00Z", "month")).toBe("2026-04");
  });

  it("zero-pads single-digit months", () => {
    expect(toPeriodKey("2026-03-07T14:23:00Z", "month")).toBe("2026-03");
  });

  it("returns the Monday of the week for 'week' unit", () => {
    // 2026-04-07 is a Tuesday — Monday of that week is 2026-04-06
    expect(toPeriodKey("2026-04-07T14:23:00Z", "week")).toBe("2026-04-06");
  });

  it("returns the same day for 'week' when the day is Monday", () => {
    // 2026-04-06 is a Monday
    expect(toPeriodKey("2026-04-06T14:23:00Z", "week")).toBe("2026-04-06");
  });

  it("returns Monday of the week for 'week' when the day is Sunday", () => {
    // 2026-04-05 is a Sunday — Monday of that week is 2026-03-30
    expect(toPeriodKey("2026-04-05T14:23:00Z", "week")).toBe("2026-03-30");
  });

  it("week keys sort chronologically as strings", () => {
    const keys = [
      toPeriodKey("2026-04-14T14:23:00Z", "week"),
      toPeriodKey("2026-03-30T14:23:00Z", "week"),
      toPeriodKey("2026-04-07T14:23:00Z", "week"),
    ];
    expect([...keys].sort()).toEqual([keys[1], keys[2], keys[0]]);
  });

  it("accepts an Instant directly", () => {
    const instant = toInstant("2026-04-07T14:23:00Z");
    expect(toPeriodKey(instant, "day")).toBe("2026-04-07");
  });

  it("accounts for time zone when determining the period", () => {
    // 2026-04-07T03:00:00Z = 2026-04-06 in America/New_York
    expect(toPeriodKey("2026-04-07T03:00:00Z", "day")).toBe("2026-04-06");
  });
});
