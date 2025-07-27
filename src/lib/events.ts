interface EventNode {
  id: string;
  postTypeEvent?: {
    // Made postTypeEvent optional at the top level
    date?: string | null;
    primaryHeader?: string | null;
    secondaryHeader?: string | null;
    image?: {
      sourceUrl?: string | null;
    } | null;
    description?: string | null;
    endTime?: string | null;
    startTime?: string | null;
  } | null; // Added null possibility here
}

interface FetchedEvent {
  node: EventNode;
}

// This will be the shape of the events after processing
export interface ProcessedEvent extends FetchedEvent {
  parsedEventDate: Date;
  parsedStartTime?: Date | null;
}

/**
 * Parses a date string from the event data into a JavaScript Date object.
 * Expected format: "Day, Month Date, Year" (e.g., "Wed, May 7, 2025").
 * Normalizes the date to the start of the day, timezone-agnostic.
 * @param dateStr The date string to parse.
 * @returns A Date object if parsing is successful, otherwise null.
 */
export function parseEventDate(
  dateStr: string | null | undefined,
): Date | null {
  if (!dateStr) {
    return null;
  }

  // Extract the parsable part, e.g., "May 7, 2025" from "Wed, May 7, 2025"
  const parsablePart = dateStr.substring(dateStr.indexOf(", ") + 2);

  // Parse date components manually to avoid timezone interpretation issues
  const dateObj = new Date(parsablePart);

  if (isNaN(dateObj.getTime())) {
    console.warn("Invalid date string encountered: " + dateStr);
    return null;
  }

  // Create a new date using the parsed components to ensure consistency
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();

  // Create date in local timezone with start of day
  const eventDate = new Date(year, month, day, 0, 0, 0, 0);

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
  if (!timeStr) {
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
 * 2. Filters out events that are in the past (includes today's events).
 * 3. Sorts the remaining (upcoming) events chronologically (soonest first).
 * 4. For events on the same day, sorts by start time.
 * @param fetchedEvents An array of events as fetched from the source.
 * @returns An array of processed and sorted upcoming events.
 */
export function processAndSortEvents(
  fetchedEvents: FetchedEvent[] | null | undefined,
): ProcessedEvent[] {
  if (!fetchedEvents || fetchedEvents.length === 0) {
    return [];
  }

  // Create today's date and normalize to start of day
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents: ProcessedEvent[] = [];

  for (const event of fetchedEvents) {
    // Ensure node and postTypeEvent exist before trying to access date
    const dateValue = event?.node?.postTypeEvent?.date;
    const parsedDate = parseEventDate(dateValue);
    const startTimeValue = event?.node?.postTypeEvent?.startTime;

    // Parse the start time if we have a valid date
    const parsedStartTime = parsedDate
      ? parseEventTime(startTimeValue, parsedDate)
      : null;

    // Include events from today onwards using direct date comparison
    if (parsedDate && parsedDate >= today) {
      upcomingEvents.push({
        ...event,
        parsedEventDate: parsedDate,
        parsedStartTime: parsedStartTime,
      });
    }
  }

  // Sort upcoming events by their parsed date, then by time for same-day events
  upcomingEvents.sort((a, b) => {
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

  return upcomingEvents;
}
