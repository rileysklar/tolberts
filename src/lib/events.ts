interface EventNode {
  id: string;
  postTypeEvent?: {
    date?: string | null;
    endDate?: string | null;
    primaryHeader?: string | null;
    secondaryHeader?: string | null;
    image?: {
      sourceUrl?: string | null;
    } | null;
    description?: string | null;
    endTime?: string | null;
    startTime?: string | null;
  } | null;
}

interface FetchedEvent {
  node: EventNode;
}

function normalizeImage(image: unknown): { sourceUrl: string } | null {
  if (!image || typeof image !== "object") {
    return null;
  }

  const sourceUrl = (image as { sourceUrl?: unknown }).sourceUrl;

  if (typeof sourceUrl !== "string" || !sourceUrl.trim()) {
    return null;
  }

  return { sourceUrl: sourceUrl.trim() };
}

// This will be the shape of the events after processing
export interface ProcessedEvent extends FetchedEvent {
  parsedEventDate: Date;
  parsedStartTime?: Date | null;
}

/**
 * Parses a date string from the event data into a JavaScript Date object.
 * Expected format: "Day, Month Date, Year" (e.g., "Wed, May 7, 2025"),
 * with the weekday prefix optional. Normalizes the date to the start of the
 * day, timezone-agnostic.
 * @param dateStr The date string to parse.
 * @returns A Date object if parsing is successful, otherwise null.
 */
const EVENT_DATE_PATTERN =
  /^(?:[A-Za-z]{3,9},\s*)?([A-Za-z]{3,9})\s+(\d{1,2}),\s*(\d{4})$/i;

const MONTH_INDEXES = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export function parseEventDate(
  dateStr: string | null | undefined,
): Date | null {
  if (!dateStr || typeof dateStr !== "string") {
    return null;
  }

  const match = dateStr.trim().match(EVENT_DATE_PATTERN);

  if (!match) {
    console.warn("Invalid date string encountered: " + dateStr);
    return null;
  }

  const [, monthName, dayPart, yearPart] = match;
  const day = Number(dayPart);
  const year = Number(yearPart);
  const month = MONTH_INDEXES.indexOf(monthName.slice(0, 3).toLowerCase());

  if (month === -1) {
    console.warn("Invalid date string encountered: " + dateStr);
    return null;
  }

  // Create date in local timezone with start of day
  const eventDate = new Date(year, month, day, 0, 0, 0, 0);

  // Reject values that rolled over (e.g. "Feb 31") instead of silently
  // returning the normalized date.
  if (
    eventDate.getFullYear() !== year ||
    eventDate.getMonth() !== month ||
    eventDate.getDate() !== day
  ) {
    console.warn("Invalid date string encountered: " + dateStr);
    return null;
  }

  return eventDate;
}

/**
 * Parses a time string into a Date object for comparison purposes.
 * Expected format: "HH:MM AM/PM" (e.g., "7:00 PM")
 * @param timeStr The time string to parse
 * @param baseDate Optional base date to set the time on (defaults to today)
 * @returns A Date object with the parsed time, or null if parsing fails
 */
export function parseEventTime(
  timeStr: string | null | undefined,
  baseDate?: Date,
): Date | null {
  if (!timeStr || typeof timeStr !== "string") {
    return null;
  }

  const today = baseDate || new Date();

  // Handle common time formats like "7:00 PM"
  const timeParts = timeStr.match(/(\d+):(\d+)\s*([AP]M)?/i);

  if (!timeParts) {
    console.warn("Invalid time format:", timeStr);
    return null;
  }

  let hours = parseInt(timeParts[1], 10);
  const minutes = parseInt(timeParts[2], 10);
  const period = timeParts[3]?.toUpperCase();

  // Handle 12-hour clock format with AM/PM
  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const result = new Date(today);
  result.setHours(hours, minutes, 0, 0);

  return result;
}

/**
 * Processes an array of fetched events:
 * 1. Parses their date strings.
 * 2. Drops events that have already happened.
 * 3. Sorts events chronologically (soonest first).
 * 4. For events on the same day, sorts by start time.
 * @param fetchedEvents An array of events as fetched from the source.
 * @returns An array of processed and sorted events.
 */
export function processAndSortEvents(
  fetchedEvents: FetchedEvent[] | null | undefined,
): ProcessedEvent[] {
  if (!Array.isArray(fetchedEvents) || fetchedEvents.length === 0) {
    return [];
  }

  const allEvents: ProcessedEvent[] = [];

  // Past events should never appear as "upcoming", even if they came from a
  // stale cache during a CMS outage.
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  for (const event of fetchedEvents) {
    // Validate event structure
    if (!event?.node?.postTypeEvent) {
      console.warn("Skipping event with missing data structure:", event);
      continue;
    }

    // Ensure node and postTypeEvent exist before trying to access date
    const postTypeEvent = event.node.postTypeEvent;
    const dateValue = postTypeEvent.date;
    const parsedDate = parseEventDate(dateValue);
    const startTimeValue = postTypeEvent.startTime;

    // Skip events without valid dates
    if (!parsedDate) {
      console.warn("Skipping event with invalid date:", {
        id: event.node.id,
        date: dateValue,
        title: postTypeEvent.primaryHeader,
      });
      continue;
    }

    // Skip events that have already happened.
    if (parsedDate < startOfToday) {
      continue;
    }

    // Parse the start time if we have a valid date
    const parsedStartTime = parseEventTime(startTimeValue, parsedDate);

    // Warn if start time is missing but still include the event
    if (!parsedStartTime && startTimeValue) {
      console.warn("Event has invalid start time format:", {
        id: event.node.id,
        startTime: startTimeValue,
        title: postTypeEvent.primaryHeader,
      });
    }

    // Include all events with valid dates. Null out malformed image data so
    // the calendar components never have to destructure `null`.
    allEvents.push({
      node: {
        ...event.node,
        postTypeEvent: {
          ...postTypeEvent,
          image: normalizeImage(postTypeEvent.image),
        },
      },
      parsedEventDate: parsedDate,
      parsedStartTime: parsedStartTime,
    });
  }

  // Sort all events by their parsed date, then by time for same-day events
  allEvents.sort((a, b) => {
    // First compare dates
    const dateComparison =
      a.parsedEventDate.getTime() - b.parsedEventDate.getTime();

    // If dates are the same, compare times
    if (dateComparison === 0) {
      // If both events have valid start times, compare them
      if (a.parsedStartTime && b.parsedStartTime) {
        return a.parsedStartTime.getTime() - b.parsedStartTime.getTime();
      }

      // If only one has a start time, prioritize the one with a time
      if (a.parsedStartTime) return -1;
      if (b.parsedStartTime) return 1;
    }

    // Otherwise just sort by date
    return dateComparison;
  });

  return allEvents;
}
