// /src/stamp.test.ts

import { describe, it, expect } from "vitest";

import { toPlainDate } from "./convert/date-convert";
import { toInstant } from "./convert/instant-convert";
import {
  todayIso,
  isSameDayIso,
  comparePlainDate,
  maxInstant,
  minInstant,
} from "./stamp";
import { withFrozenTime } from "./test-utils/with-frozen-time";

describe("todayIso", () => {
  it("returns today as ISO string", async () => {
    await withFrozenTime({
      now: "2026-02-19T15:00:00Z",
      fn: async () => {
        expect(todayIso()).toBe("2026-02-19");
      },
    });
  });

  it("matches ISO format (YYYY-MM-DD)", () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("isSameDayIso", () => {
  it("returns true for today's date", async () => {
    await withFrozenTime({
      now: "2026-02-19T15:00:00Z",
      fn: async () => {
        expect(isSameDayIso("2026-02-19")).toBe(true);
      },
    });
  });

  it("returns false for different date", async () => {
    await withFrozenTime({
      now: "2026-02-19T15:00:00Z",
      fn: async () => {
        expect(isSameDayIso("2026-02-20")).toBe(false);
        expect(isSameDayIso("2026-02-18")).toBe(false);
      },
    });
  });

  it("returns false for different year", async () => {
    await withFrozenTime({
      now: "2026-02-19T15:00:00Z",
      fn: async () => {
        expect(isSameDayIso("2025-02-19")).toBe(false);
      },
    });
  });
});

describe("comparePlainDate", () => {
  it("returns -1 when a < b", () => {
    expect(comparePlainDate("2026-02-18", "2026-02-19")).toBe(-1);
  });

  it("returns 0 when a === b", () => {
    expect(comparePlainDate("2026-02-19", "2026-02-19")).toBe(0);
  });

  it("returns 1 when a > b", () => {
    expect(comparePlainDate("2026-02-20", "2026-02-19")).toBe(1);
  });

  it("works with PlainDate objects", () => {
    const a = toPlainDate("2026-02-18");
    const b = toPlainDate("2026-02-19");
    expect(comparePlainDate(a, b)).toBe(-1);
  });

  it("works with mixed string and PlainDate", () => {
    const a = toPlainDate("2026-02-19");
    expect(comparePlainDate(a, "2026-02-19")).toBe(0);
  });
});

describe("maxInstant", () => {
  it("returns the latest instant from array", () => {
    const instants = [
      "2026-02-19T14:00:00Z",
      "2026-02-19T16:00:00Z",
      "2026-02-19T15:00:00Z",
    ];
    const max = maxInstant(instants);
    expect(max?.toString()).toBe("2026-02-19T16:00:00Z");
  });

  it("returns null for empty array", () => {
    expect(maxInstant([])).toBeNull();
  });

  it("works with single element", () => {
    const max = maxInstant(["2026-02-19T15:00:00Z"]);
    expect(max?.toString()).toBe("2026-02-19T15:00:00Z");
  });

  it("works with Instant objects", () => {
    const instants = [
      toInstant("2026-02-19T14:00:00Z"),
      toInstant("2026-02-19T16:00:00Z"),
      toInstant("2026-02-19T15:00:00Z"),
    ];
    const max = maxInstant(instants);
    expect(max?.toString()).toBe("2026-02-19T16:00:00Z");
  });

  it("works with mixed strings and Instant objects", () => {
    const instants = [
      "2026-02-19T14:00:00Z",
      toInstant("2026-02-19T16:00:00Z"),
      "2026-02-19T15:00:00Z",
    ];
    const max = maxInstant(instants);
    expect(max?.toString()).toBe("2026-02-19T16:00:00Z");
  });
});

describe("minInstant", () => {
  it("returns the earliest instant from array", () => {
    const instants = [
      "2026-02-19T16:00:00Z",
      "2026-02-19T14:00:00Z",
      "2026-02-19T15:00:00Z",
    ];
    const min = minInstant(instants);
    expect(min?.toString()).toBe("2026-02-19T14:00:00Z");
  });

  it("returns null for empty array", () => {
    expect(minInstant([])).toBeNull();
  });

  it("works with single element", () => {
    const min = minInstant(["2026-02-19T15:00:00Z"]);
    expect(min?.toString()).toBe("2026-02-19T15:00:00Z");
  });

  it("works with Instant objects", () => {
    const instants = [
      toInstant("2026-02-19T16:00:00Z"),
      toInstant("2026-02-19T14:00:00Z"),
      toInstant("2026-02-19T15:00:00Z"),
    ];
    const min = minInstant(instants);
    expect(min?.toString()).toBe("2026-02-19T14:00:00Z");
  });

  it("works with mixed strings and Instant objects", () => {
    const instants = [
      "2026-02-19T16:00:00Z",
      toInstant("2026-02-19T14:00:00Z"),
      "2026-02-19T15:00:00Z",
    ];
    const min = minInstant(instants);
    expect(min?.toString()).toBe("2026-02-19T14:00:00Z");
  });
});
