/**
 * Helpers for rendering CMS-provided event artwork without depending on the
 * WordPress host being reachable.
 */

/** Local image bundled with the site; always available. */
export const FALLBACK_EVENT_IMAGE = "/tolbs-outside.jpg";

/**
 * Build a CSS `background-image` value that layers the CMS image over a local
 * fallback. If the remote image 404s or the CMS is offline, the browser paints
 * the local image underneath instead of leaving an empty card.
 */
export function eventBackgroundImage(sourceUrl?: string | null): string {
  const fallback = `url("${FALLBACK_EVENT_IMAGE}")`;
  const url = typeof sourceUrl === "string" ? sourceUrl.trim() : "";

  // Only allow absolute http(s) URLs or same-origin paths in CSS.
  if (!url || !/^(https?:\/\/|\/)/i.test(url)) {
    return fallback;
  }

  return `url("${url.replace(/"/g, "%22")}"), ${fallback}`;
}

/** Format an event time range, tolerating missing start/end times. */
export function formatEventTime(
  startTime?: string | null,
  endTime?: string | null,
): string {
  if (startTime && endTime) {
    return `${startTime} - ${endTime}`;
  }

  return startTime || endTime || "";
}
