export const config = {
  recaptcha: {
    siteKey: import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || "",
  },
  googleAppsScript: {
    fetchFromSheetUrl: import.meta.env.PUBLIC_FETCH_FROM_SHEET_URL || "",
    postToSheetUrl: import.meta.env.PUBLIC_POST_TO_SHEET_URL || "",
  },
} as const;
