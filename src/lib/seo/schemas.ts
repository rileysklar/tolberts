import { seoConfig, getOgImageUrl, getAbsoluteUrl } from "./config";

export const baseSchema = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "MusicVenue"],
  name: seoConfig.siteName,
  description: seoConfig.defaultDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: seoConfig.address.street,
    addressLocality: seoConfig.address.city,
    addressRegion: seoConfig.address.state,
    postalCode: seoConfig.address.zip,
    addressCountry: seoConfig.address.country,
  },
  image: getOgImageUrl(),
  telephone: seoConfig.phone,
  url: seoConfig.siteUrl,
  sameAs: [seoConfig.facebookUrl, seoConfig.instagramUrl],
  servesCuisine: "American",
  menu: getAbsoluteUrl("/menu"),
  acceptsReservations: "True",
  openingHours: seoConfig.openingHours,
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
  // Use endDate if provided (for overnight events), otherwise use start date
  let endDate;
  if (eventData.endTime) {
    try {
      const effectiveEndDate = eventData.endDate || eventData.date;
      endDate = new Date(`${effectiveEndDate} ${eventData.endTime}`);
      if (isNaN(endDate.getTime())) {
        throw new Error("Invalid end date");
      }
    } catch (error) {
      console.warn(
        "Failed to parse event end date, using fallback:",
        error,
        eventData,
      );
      endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    }
  } else {
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
    image: eventData.image?.sourceUrl || getOgImageUrl(),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    location: {
      "@type": "Place",
      name: seoConfig.siteName,
      address: {
        "@type": "PostalAddress",
        streetAddress: seoConfig.address.street,
        addressLocality: seoConfig.address.city,
        addressRegion: seoConfig.address.state,
        postalCode: seoConfig.address.zip,
        addressCountry: seoConfig.address.country,
      },
    },
    performer: {
      "@type": "MusicGroup",
      name: eventData.primaryHeader || "Live Music",
      description: eventData.secondaryHeader || "Live music performance",
    },
  };
}
