// Feature flags and configuration constants
export const config = {
  // Maintenance and announcements
  isUnderMaintenance: false,
  showAnnouncement: true, // Toggle this to show/hide site-wide announcements

  // Other feature flags can be added here
  // showSpecialEvents: true,
  // enableNewFeature: false,
} as const;

export type Config = typeof config;
