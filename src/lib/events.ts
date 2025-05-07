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
}

/**
 * Parses a date string from the event data into a JavaScript Date object.
 * Expected format: "Day, Month Date, Year" (e.g., "Wed, May 7, 2025").
 * Normalizes the date to the start of the day (00:00:00).
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
  const eventDate = new Date(parsablePart);

  if (isNaN(eventDate.getTime())) {
    console.warn("Invalid date string encountered: " + dateStr);
    return null; // Invalid date
  }
  eventDate.setHours(0, 0, 0, 0); // Normalize to start of day for consistent comparison
  return eventDate;
}

/**
 * Processes an array of fetched events:
 * 1. Parses their date strings.
 * 2. Filters out events that are in the past.
 * 3. Sorts the remaining (upcoming) events chronologically (soonest first).
 * @param fetchedEvents An array of events as fetched from the source.
 * @returns An array of processed and sorted upcoming events.
 */
export function processAndSortEvents(
  fetchedEvents: FetchedEvent[] | null | undefined,
): ProcessedEvent[] {
  if (!fetchedEvents || fetchedEvents.length === 0) {
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to the start of the day

  const upcomingEvents: ProcessedEvent[] = [];

  for (const event of fetchedEvents) {
    // Ensure node and postTypeEvent exist before trying to access date
    const dateValue = event?.node?.postTypeEvent?.date;
    const parsedDate = parseEventDate(dateValue);

    if (parsedDate && parsedDate >= today) {
      upcomingEvents.push({
        ...event,
        parsedEventDate: parsedDate,
      });
    }
  }

  // Sort upcoming events by their parsed date (soonest first)
  upcomingEvents.sort(
    (a, b) => a.parsedEventDate.getTime() - b.parsedEventDate.getTime(),
  );

  return upcomingEvents;
}
