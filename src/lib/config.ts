// Feature flags and configuration constants
export const config = {
  // Maintenance and announcements
  isUnderMaintenance: false,
  showClosureAnnouncement: false, // Toggle this to show/hide closure announcements

  // Other feature flags can be added here
  // showSpecialEvents: true,
  // enableNewFeature: false,
} as const;

export type Config = typeof config;
