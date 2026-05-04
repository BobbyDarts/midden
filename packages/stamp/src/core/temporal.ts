// /src/core/temporal.ts

import { Temporal as PolyfillTemporal } from "@js-temporal/polyfill";

const TemporalGlobal = (
  globalThis as unknown as { Temporal?: typeof PolyfillTemporal }
).Temporal;

export const TemporalImpl = TemporalGlobal ?? PolyfillTemporal;
export type Instant = InstanceType<typeof TemporalImpl.Instant>;
export type PlainDate = InstanceType<typeof TemporalImpl.PlainDate>;
export type PlainTime = InstanceType<typeof TemporalImpl.PlainTime>;
