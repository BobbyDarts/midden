// /src/compare/instant-compare.test.ts

import { describe, it, expect } from "vitest";

import { compareInstants, isAfter, isBefore, isEqual } from "./instant-compare";
import { toInstant } from "../convert/instant-convert";

describe("compareInstants", () => {
  it("returns -1 when a < b", () => {
    expect(
      compareInstants("2026-02-19T14:00:00Z", "2026-02-19T15:00:00Z"),
    ).toBe(-1);
  });

  it("returns 0 when a === b", () => {
    expect(
      compareInstants("2026-02-19T15:00:00Z", "2026-02-19T15:00:00Z"),
    ).toBe(0);
  });

  it("returns 1 when a > b", () => {
    expect(
      compareInstants("2026-02-19T16:00:00Z", "2026-02-19T15:00:00Z"),
    ).toBe(1);
  });

  it("works with Instant objects", () => {
    const a = toInstant("2026-02-19T14:00:00Z");
    const b = toInstant("2026-02-19T15:00:00Z");
    expect(compareInstants(a, b)).toBe(-1);
  });
});

describe("isAfter", () => {
  it("returns true when a > b", () => {
    expect(isAfter("2026-02-19T16:00:00Z", "2026-02-19T15:00:00Z")).toBe(true);
  });

  it("returns false when a < b", () => {
    expect(isAfter("2026-02-19T14:00:00Z", "2026-02-19T15:00:00Z")).toBe(false);
  });

  it("returns false when a === b", () => {
    expect(isAfter("2026-02-19T15:00:00Z", "2026-02-19T15:00:00Z")).toBe(false);
  });

  it("handles year boundaries correctly", () => {
    const newYear = toInstant("2026-01-01T00:00:00Z");
    const oldYear = toInstant("2025-12-31T23:59:59Z");
    expect(isAfter(newYear, oldYear)).toBe(true);
  });
});

describe("isBefore", () => {
  it("returns true when a < b", () => {
    expect(isBefore("2026-02-19T14:00:00Z", "2026-02-19T15:00:00Z")).toBe(true);
  });

  it("returns false when a > b", () => {
    expect(isBefore("2026-02-19T16:00:00Z", "2026-02-19T15:00:00Z")).toBe(
      false,
    );
  });

  it("returns false when a === b", () => {
    expect(isBefore("2026-02-19T15:00:00Z", "2026-02-19T15:00:00Z")).toBe(
      false,
    );
  });
});

describe("isEqual", () => {
  it("returns true when a === b", () => {
    expect(isEqual("2026-02-19T15:00:00Z", "2026-02-19T15:00:00Z")).toBe(true);
  });

  it("returns false when a !== b", () => {
    expect(isEqual("2026-02-19T14:00:00Z", "2026-02-19T15:00:00Z")).toBe(false);
  });

  it("works with Instant objects", () => {
    const a = toInstant("2026-02-19T15:00:00Z");
    const b = toInstant("2026-02-19T15:00:00Z");
    expect(isEqual(a, b)).toBe(true);
  });

  it("works with mixed string and Instant", () => {
    const a = "2026-02-19T15:00:00Z";
    const b = toInstant("2026-02-19T15:00:00Z");
    expect(isEqual(a, b)).toBe(true);
  });
});
