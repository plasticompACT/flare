
import { DateTime } from "luxon";

export function toUnixSeconds(dt: Date): number {
  return Math.floor(dt.getTime() / 1000);
}

export function computeDailyTimes(startDateISO: string, hour: number, minute: number, timezone: string) {
  const base = DateTime.fromISO(startDateISO, { zone: timezone }).set({ hour, minute, second: 0, millisecond: 0 });
  const days = Array.from({ length: 11 }, (_, i) => i); // 0..10
  return days.map(i => base.plus({ days: i }).toUTC());
}
