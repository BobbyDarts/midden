// /src/core/time-source.test.ts

import { describe, it, expect } from "vitest";

import { TemporalImpl } from "./temporal";
import {
  getNow,
  setNow,
  getToday,
  getTimeZoneId,
  setTimeZoneId,
  resetTimeSource,
} from "./time-source";
import { toInstant } from "../convert/instant-convert";
import { todayIso } from "../stamp";
import { withFrozenTime } from "../test-utils/with-frozen-time";

describe("Time Source Management", () => {
  it("getNow returns current instant", () => {
    const now = getNow();
    expect(now).toBeInstanceOf(TemporalImpl.Instant);
  });

  it("setNow overrides the current instant and date", () => {
    const fixedInstant = toInstant("2026-02-19T15:00:00Z");
    setNow(fixedInstant);

    try {
      const now = getNow();
      expect(now.toString()).toBe("2026-02-19T15:00:00Z");

      // Also sets today to match
      const today = getToday();
      expect(today.toString()).toBe("2026-02-19");
    } finally {
      resetTimeSource();
    }
  });

  it("getToday returns current date", () => {
    const today = getToday();
    expect(today).toBeInstanceOf(TemporalImpl.PlainDate);
  });

  it("getTimeZoneId returns current time zone", () => {
    const tz = getTimeZoneId();
    expect(typeof tz).toBe("string");
    expect(tz.length).toBeGreaterThan(0);
  });

  it("setTimeZoneId overrides the time zone", () => {
    setTimeZoneId("America/New_York");
    try {
      const tz = getTimeZoneId();
      expect(tz).toBe("America/New_York");
    } finally {
      resetTimeSource();
    }
  });

  it("resetTimeSource restores system time source", () => {
    const fixedInstant = toInstant("1999-01-01T15:00:00Z");
    setNow(fixedInstant);
    expect(todayIso()).toBe("1999-01-01");

    resetTimeSource();

    expect(todayIso()).not.toBe("1999-01-01");
  });

  it("withFrozenTime auto-resets after callback", async () => {
    const beforeTime = TemporalImpl.Now.plainDateISO().toString();

    await withFrozenTime({
      now: "2026-02-19T15:00:00Z",
      fn: async () => {
        expect(todayIso()).toBe("2026-02-19");
      },
    });

    expect(todayIso()).toBe(beforeTime);
  });
});
