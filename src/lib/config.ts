// Feature flags and configuration constants
export const config = {
  // Maintenance and announcements
  isUnderMaintenance: false,
  // Disabled: the Concert on Lake Grapevine date is no longer confirmed
  // (may run in April, October, or not at all). Re-enable once a date is set.
  showAnnouncement: false, // Toggle this to show/hide site-wide announcements

  // Other feature flags can be added here
  // showSpecialEvents: true,
  // enableNewFeature: false,
} as const;

export type Config = typeof config;
