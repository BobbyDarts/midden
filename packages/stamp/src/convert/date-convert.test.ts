// /src/convert/date-convert.test.ts

import { describe, it, expect } from "vitest";

import { toPlainDate } from "./date-convert";
import { TemporalImpl } from "../core/temporal";

describe("toPlainDate", () => {
  it("converts ISO string to PlainDate", () => {
    const date = toPlainDate("2026-02-19");
    expect(date).toBeInstanceOf(TemporalImpl.PlainDate);
    expect(date.toString()).toBe("2026-02-19");
  });

  it("returns PlainDate unchanged", () => {
    const original = toPlainDate("2026-02-19");
    const result = toPlainDate(original);
    expect(result).toBe(original);
  });

  it("throws on invalid date string", () => {
    expect(() => toPlainDate("invalid-date")).toThrow();
  });

  it("handles leap year dates correctly", () => {
    const leapDay = toPlainDate("2024-02-29");
    expect(leapDay.toString()).toBe("2024-02-29");
  });
});
