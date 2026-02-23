/**
 * Application-wide timezone management.
 *
 * Default: `Asia/Kolkata` (IST, UTC+5:30)
 * Override via the `APP_TIMEZONE` environment variable.
 *
 * @example
 * // In .env:
 * APP_TIMEZONE=Asia/Kolkata
 *
 * // In code:
 * import { nowISO, APP_TIMEZONE } from '../common/utils/timezone.util';
 * const ts = nowISO(); // "2026-02-23T20:34:28.232+05:30"
 */

/** The configured timezone for the entire application. */
export const APP_TIMEZONE: string =
    process.env.APP_TIMEZONE ?? 'Asia/Kolkata';

/**
 * Returns the current date/time as an ISO 8601 string with the
 * application timezone offset (e.g. "2026-02-23T20:34:28.232+05:30").
 *
 * Unlike `new Date().toISOString()` which always returns UTC ("...Z"),
 * this function reflects the local wall-clock time in the configured zone.
 *
 * @param timezone - IANA timezone name (default: `APP_TIMEZONE`)
 */
export function nowISO(timezone: string = APP_TIMEZONE): string {
    return toISO(new Date(), timezone);
}

/**
 * Converts an existing `Date` object to an ISO 8601 string in the
 * given timezone.
 *
 * @param date     - The date to format
 * @param timezone - IANA timezone name (default: `APP_TIMEZONE`)
 */
export function toISO(date: Date, timezone: string = APP_TIMEZONE): string {
    // Extract date/time components rendered in the target timezone
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).formatToParts(date);

    const get = (type: Intl.DateTimeFormatPartTypes): string =>
        parts.find((p) => p.type === type)?.value ?? '00';

    // Extract the UTC offset string, e.g. "GMT+05:30" → "+05:30"
    const offsetParts = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'longOffset',
    }).formatToParts(date);

    const rawOffset =
        offsetParts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+00:00';

    // "GMT+05:30" → "+05:30" | "GMT" (UTC) → "+00:00"
    const offset = rawOffset === 'GMT' ? '+00:00' : rawOffset.replace('GMT', '');

    const ms = String(date.getMilliseconds()).padStart(3, '0');

    return (
        `${get('year')}-${get('month')}-${get('day')}` +
        `T${get('hour')}:${get('minute')}:${get('second')}.${ms}${offset}`
    );
}

/**
 * Returns the UTC offset string for the configured timezone.
 * E.g. "+05:30" for Asia/Kolkata.
 */
export function getTimezoneOffset(timezone: string = APP_TIMEZONE): string {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'longOffset',
    }).formatToParts(new Date());

    const raw =
        parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+00:00';
    return raw === 'GMT' ? '+00:00' : raw.replace('GMT', '');
}
