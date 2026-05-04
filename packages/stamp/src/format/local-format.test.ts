// /src/format/local-format.test.ts

import { describe, it, expect, beforeEach } from "vitest";

import { formatLocal, displayDate } from "./local-format";
import { toPlainDate } from "../convert/date-convert";
import { toInstant } from "../convert/instant-convert";
import { setTimeZoneId, resetTimeSource } from "../core/time-source";

describe("formatLocal", () => {
  beforeEach(() => {
    setTimeZoneId("America/New_York");
    return () => resetTimeSource();
  });

  it("formats instant in local time zone", () => {
    const instant = toInstant("2026-02-19T15:00:00Z");
    const formatted = formatLocal(instant);

    // Should show Eastern Time (UTC-5)
    expect(formatted).toContain("10:00"); // 15:00 UTC - 5 hours = 10:00 EST
  });

  it("accepts custom format options", () => {
    const instant = toInstant("2026-02-19T15:00:00Z");
    const formatted = formatLocal(instant, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    expect(formatted).toContain("10:00");
  });

  it("respects time zone setting", () => {
    setTimeZoneId("America/Los_Angeles");

    const instant = toInstant("2026-02-19T15:00:00Z");
    const formatted = formatLocal(instant);

    // Should show Pacific Time (UTC-8)
    expect(formatted).toContain("7:00"); // 15:00 UTC - 8 hours = 07:00 PST
  });
});

describe("displayDate", () => {
  beforeEach(() => {
    setTimeZoneId("America/New_York");
    return () => resetTimeSource();
  });

  it("displays plain date in local time zone", () => {
    const date = toPlainDate("2026-02-19");
    const displayed = displayDate(date);

    expect(displayed).toContain("2/19/2026");
  });

  it("accepts custom format options", () => {
    const date = toPlainDate("2026-02-19");
    const displayed = displayDate(date, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    expect(displayed).toContain("February");
    expect(displayed).toContain("19");
    expect(displayed).toContain("2026");
  });
});
