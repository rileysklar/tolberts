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
    "Fr 11:00-23:30",
    "Sa 11:00-23:30",
    "Su 11:00-21:00",
  ],
};

export function generateEventSchema(event) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.postTypeEvent.primaryHeader,
    description: event.postTypeEvent.description,
    image: event.postTypeEvent.image.sourceUrl,
    startDate: new Date(
      `${event.postTypeEvent.date} ${event.postTypeEvent.startTime}`,
    ).toISOString(),
    endDate: new Date(
      `${event.postTypeEvent.date} ${event.postTypeEvent.endTime}`,
    ).toISOString(),
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
      name: event.postTypeEvent.primaryHeader,
      description: event.postTypeEvent.secondaryHeader,
    },
  };
}
