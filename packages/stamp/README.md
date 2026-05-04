# @midden/stamp

A lightweight, [Temporal](https://tc39.es/proposal-temporal/)-based time utility library for JavaScript and TypeScript applications.

Provides utilities for working with instants, plain dates, formatting, comparison, and period grouping — built on the `Temporal` API with polyfill support.

## Installation

```bash
npm install @midden/stamp
# or
pnpm add @midden/stamp
```

## Requirements

- `@js-temporal/polyfill` is included as a dependency and used automatically in environments without native `Temporal` support.

## Usage

### Time Source

```typescript
import { getNow, getToday, getTimeZoneId, setTimeZoneId } from "@midden/stamp";

const now = getNow(); // Temporal.Instant
const today = getToday(); // Temporal.PlainDate
const tz = getTimeZoneId(); // "America/New_York"

setTimeZoneId("America/Chicago");
```

### Convenience Helpers

```typescript
import { todayIso, nowIso, isSameDayIso } from "@midden/stamp";

todayIso(); // "2026-04-07"
nowIso(); // "2026-04-07T14:23:00Z"
isSameDayIso("2026-04-07"); // true | false
```

### Conversion

```typescript
import {
  toInstant,
  toPlainDate,
  toPlainTime,
  instantToPlainDate,
} from "@midden/stamp";

toInstant("2026-04-07T14:23:00Z"); // Temporal.Instant
toPlainDate("2026-04-07"); // Temporal.PlainDate
toPlainTime("14:23:00"); // Temporal.PlainTime
instantToPlainDate("2026-04-07T14:23:00Z"); // Temporal.PlainDate in local time zone
```

### Comparison

```typescript
import {
  compareInstants,
  isAfter,
  isBefore,
  isEqual,
  comparePlainDate,
} from "@midden/stamp";

isAfter("2026-04-07T15:00:00Z", "2026-04-07T14:00:00Z"); // true
isBefore("2026-04-07T13:00:00Z", "2026-04-07T14:00:00Z"); // true
isEqual("2026-04-07T14:00:00Z", "2026-04-07T14:00:00Z"); // true

compareInstants(a, b); // -1 | 0 | 1
comparePlainDate(a, b); // -1 | 0 | 1
```

### Min / Max

```typescript
import { maxInstant, minInstant } from "@midden/stamp";

maxInstant(["2026-04-07T14:00:00Z", "2026-04-07T16:00:00Z"]); // Temporal.Instant | null
minInstant(["2026-04-07T14:00:00Z", "2026-04-07T16:00:00Z"]); // Temporal.Instant | null
```

### Formatting

```typescript
import { formatLocal, displayDate } from "@midden/stamp";

const instant = Temporal.Instant.from("2026-04-07T14:00:00Z");
formatLocal(instant); // "4/7/2026, 10:00:00 AM"
formatLocal(instant, { hour: "2-digit", minute: "2-digit" }); // "10:00 AM"

const date = Temporal.PlainDate.from("2026-04-07");
displayDate(date); // "4/7/2026"
displayDate(date, { month: "long", day: "numeric" }); // "April 7"
```

### Period Grouping

Useful for bucketing timestamps into chart-friendly keys.

```typescript
import { toPeriodKey } from "@midden/stamp";

toPeriodKey("2026-04-07T14:23:00Z", "day"); // "2026-04-07"
toPeriodKey("2026-04-07T14:23:00Z", "week"); // "2026-04-06" (Monday of that week)
toPeriodKey("2026-04-07T14:23:00Z", "month"); // "2026-04"
```

All period keys are sortable as strings.

## Testing Utilities

`@midden/stamp` ships a `/testing` subpath for use in test environments. This export is not included in the main bundle.

```typescript
import {
  withFrozenTime,
  setNow,
  resetTimeSource,
  setTimeZoneId,
} from "@midden/stamp/testing";
```

### `withFrozenTime`

Freezes the time source for the duration of a callback, then resets it automatically.

```typescript
await withFrozenTime({
  now: "2026-04-07T14:23:00Z",
  fn: async () => {
    expect(todayIso()).toBe("2026-04-07");
  },
});
```

### `setNow` / `resetTimeSource`

Override and reset the active time source manually.

```typescript
setNow(Temporal.Instant.from("2026-04-07T14:23:00Z"));
// ... test code ...
resetTimeSource();
```

## Temporal Conventions

- Store dates and times in **UTC** wherever possible.
- Use `Temporal.PlainDate` for calendar-only values (e.g. due dates).
- Use `Temporal.Instant` for timestamp values (e.g. createdAt, updatedAt).
- Convert to local time only for **display** using `formatLocal` or `displayDate`.

## License

MIT
