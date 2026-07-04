export const en = {
  tabs: {
    map: "Map",
    profile: "Profile",
  },
  routes: {
    title: "Routes",
    empty: "No routes available",
  },
  profile: {
    title: "Profile",
    photos: "Photos",
    locked: "Profile locked",
    unlock: "Unlock",
  },
  settings: {
    title: "Settings",
    language: "Language",
  },
  photos: {
    title: "Photos",
    empty: "No photos yet. Open a route and use the camera button to take one.",
  },
  auth: {
    prompt: "Unlock your profile",
    failed: "Authentication failed. Try again.",
  },
  theme: {
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },
  route: {
    start: "Start",
    elevation: "Elevation",
    kilometer: "Kilometer",
    province: "Province:",
    address: "Address:",
    notFound: "Route not found",
  },
  map: {
    unsupported: "Maps are only available on Android and iOS",
    permissionDenied: "Permission to access location was denied",
  },
  language: {
    en: "English",
    nl: "Nederlands",
    fi: "Suomi",
  },
};

export type Translations = typeof en;
