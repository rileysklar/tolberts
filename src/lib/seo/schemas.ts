export const baseSchema = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "MusicVenue"],
  name: "Tolbert's Restaurant & Chili Parlor",
  description:
    "Tolbert's Restaurant is a family-owned and operated restaurant located in Grapevine, Texas. We serve the best chili in Texas and have live music events regularly.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "423 S Main St",
    addressLocality: "Grapevine",
    addressRegion: "TX",
    postalCode: "76051",
    addressCountry: "US",
  },
  image: "https://tolbertsrestaurant.netlify.app/tolberts.webp",
  telephone: "+1-817-555-1234",
  url: "https://tolbertsrestaurant.com",
  sameAs: [
    "https://www.facebook.com/tolbertsrestaurant",
    "https://www.instagram.com/tolbertsrestaurant",
  ],
  servesCuisine: "American",
  menu: "https://tolbertsrestaurant.com/menu",
  acceptsReservations: "True",
  openingHours: [
    "Mo 11:00-21:00",
    "Tu 11:00-22:00",
    "We 11:00-23:00",
    "Th 11:00-23:00",
    "Fr 11:00-24:00",
    "Sa 11:00-24:00",
    "Su 11:00-21:00",
  ],
};

export function generateEventSchemas(events) {
  if (!events || !Array.isArray(events)) {
    return [];
  }

  return events
    .map((event) => generateSingleEventSchema(event?.node))
    .filter((schema) => schema !== null);
}

function generateSingleEventSchema(event) {
  // Validate required event data
  if (!event?.postTypeEvent) {
    console.warn("Event missing postTypeEvent data:", event);
    return null;
  }

  const eventData = event.postTypeEvent;

  // Validate required fields
  if (!eventData.date || !eventData.startTime || !eventData.primaryHeader) {
    console.warn("Event missing required fields:", eventData);
    return null;
  }

  // Create start date with validation
  let startDate;
  try {
    startDate = new Date(`${eventData.date} ${eventData.startTime}`);
    if (isNaN(startDate.getTime())) {
      throw new Error("Invalid start date");
    }
  } catch (error) {
    console.warn("Failed to parse event start date:", error, eventData);
    return null;
  }

  // Create end date with fallback
  let endDate;
  if (eventData.endTime) {
    try {
      endDate = new Date(`${eventData.date} ${eventData.endTime}`);
      if (isNaN(endDate.getTime())) {
        throw new Error("Invalid end date");
      }
    } catch (error) {
      console.warn(
        "Failed to parse event end date, using fallback:",
        error,
        eventData,
      );
      // Fallback: add 2 hours to start time
      endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    }
  } else {
    // Fallback: add 2 hours to start time if no end time provided
    console.warn("Event missing end time, using 2-hour fallback:", eventData);
    endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  }

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventData.primaryHeader || "Event at Tolbert's",
    description:
      eventData.description ||
      "Live music event at Tolbert's Restaurant & Chili Parlor",
    image:
      eventData.image?.sourceUrl ||
      "https://tolbertsrestaurant.com/tolberts.webp",
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    location: {
      "@type": "Place",
      name: "Tolbert's Restaurant & Chili Parlor",
      address: {
        "@type": "PostalAddress",
        streetAddress: "423 S Main St",
        addressLocality: "Grapevine",
        addressRegion: "TX",
        postalCode: "76051",
        addressCountry: "US",
      },
    },
    performer: {
      "@type": "MusicGroup",
      name: eventData.primaryHeader || "Live Music",
      description: eventData.secondaryHeader || "Live music performance",
    },
  };
}
