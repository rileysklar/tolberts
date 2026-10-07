// Centralized SEO configuration with intelligent defaults
export const seoConfig = {
  // Site identity
  siteName: "Tolbert's Restaurant & Chili Parlor",
  siteUrl: "https://tolbertsrestaurant.com",

  // Default meta
  defaultTitle:
    "Tolbert's Restaurant & Chili Parlor | Best Chili in Grapevine, TX",
  defaultDescription:
    "Tolbert's Restaurant is a family-owned restaurant in Grapevine, Texas serving the best chili in Texas with live music, great food, and drinks since 1976.",

  // Images (relative paths, will be combined with siteUrl)
  defaultOgImage: "/tolbs-outside.jpg",
  logoWhite: "/logo-white.png",
  logoBlack: "/logo-black.png",

  // Social
  twitterHandle: "@tolbertsrestaurant",
  facebookUrl: "https://www.facebook.com/tolbertsrestaurant",
  instagramUrl: "https://www.instagram.com/tolbertsrestaurant",

  // Contact
  phone: "+1-817-421-4888",
  phoneDisplay: "(817) 421-4888",
  email: "tolbertsrestaurant@gmail.com",

  // Address
  address: {
    street: "423 S Main St",
    city: "Grapevine",
    state: "TX",
    zip: "76051",
    country: "US",
  },

  // Business hours (ISO 8601 format for schema)
  openingHours: [
    "Mo 11:00-21:00",
    "Tu 11:00-22:00",
    "We 11:00-23:00",
    "Th 11:00-23:00",
    "Fr 11:00-24:00",
    "Sa 11:00-24:00",
    "Su 11:00-21:00",
  ],
} as const;

// Helper to build absolute URLs
export function getAbsoluteUrl(path: string): string {
  const base = seoConfig.siteUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

// Helper to get OG image URL (always absolute)
export function getOgImageUrl(imagePath?: string): string {
  return getAbsoluteUrl(imagePath || seoConfig.defaultOgImage);
}

// Normalize any internal path or absolute URL into a single canonical URL.
// Trailing slashes are enforced so the canonical matches the served URL and
// the generated sitemap (e.g. /about -> /about/), while the root stays "/".
export function getCanonicalUrl(input?: string): string {
  const base = seoConfig.siteUrl.replace(/\/$/, "");
  if (!input) return `${base}/`;

  let pathname: string;
  try {
    pathname = new URL(input).pathname;
  } catch {
    pathname = input;
  }

  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (pathname !== "/" && !pathname.endsWith("/")) pathname = `${pathname}/`;

  return `${base}${pathname}`;
}

// Type for meta tags
export interface MetaTags {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  twitterHandle?: string;
  schemaData?: object[];
  noindex?: boolean;
}

// Build complete meta tags with defaults
export function buildMetaTags(
  partial: MetaTags,
): Required<
  Omit<MetaTags, "schemaData" | "noindex" | "publishedTime" | "modifiedTime">
> &
  Pick<MetaTags, "schemaData" | "noindex" | "publishedTime" | "modifiedTime"> {
  return {
    title: partial.title || seoConfig.defaultTitle,
    description: partial.description || seoConfig.defaultDescription,
    image: getOgImageUrl(partial.image),
    imageAlt: partial.imageAlt || seoConfig.siteName,
    url: getCanonicalUrl(partial.url),
    type: partial.type || "website",
    publishedTime: partial.publishedTime,
    modifiedTime: partial.modifiedTime,
    tags: partial.tags ?? [],
    twitterHandle: partial.twitterHandle || seoConfig.twitterHandle,
    schemaData: partial.schemaData,
    noindex: partial.noindex,
  };
}

export type SeoConfig = typeof seoConfig;
