// /src/convert/instant-convert.test.ts

import { describe, it, expect, beforeEach } from "vitest";

import { toInstant, instantToPlainDate } from "./instant-convert";
import { TemporalImpl } from "../core/temporal";
import { setTimeZoneId, resetTimeSource } from "../core/time-source";

describe("toInstant", () => {
  it("converts ISO string to Instant", () => {
    const instant = toInstant("2026-02-19T15:00:00Z");
    expect(instant).toBeInstanceOf(TemporalImpl.Instant);
    expect(instant.toString()).toBe("2026-02-19T15:00:00Z");
  });

  it("returns Instant unchanged", () => {
    const original = TemporalImpl.Instant.from("2026-02-19T15:00:00Z");
    const result = toInstant(original);
    expect(result).toBe(original);
  });

  it("throws on invalid instant string", () => {
    expect(() => toInstant("invalid-instant")).toThrow();
  });
});

describe("instantToPlainDate", () => {
  beforeEach(() => {
    setTimeZoneId("America/New_York");
    return () => resetTimeSource();
  });

  it("converts an ISO instant string to a PlainDate in local time zone", () => {
    const date = instantToPlainDate("2026-04-07T14:23:00Z");
    expect(date).toBeInstanceOf(TemporalImpl.PlainDate);
    expect(date.toString()).toBe("2026-04-07");
  });

  it("converts an Instant to a PlainDate in local time zone", () => {
    const instant = toInstant("2026-04-07T14:23:00Z");
    const date = instantToPlainDate(instant);
    expect(date.toString()).toBe("2026-04-07");
  });

  it("accounts for time zone when converting — UTC midnight may be previous day", () => {
    // 2026-04-07T03:00:00Z = 2026-04-06T23:00:00 in America/New_York (UTC-4)
    const date = instantToPlainDate("2026-04-07T03:00:00Z");
    expect(date.toString()).toBe("2026-04-06");
  });
});
