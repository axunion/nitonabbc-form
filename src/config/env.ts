export const config = {
	recaptcha: {
		siteKey: import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || "",
	},
	googleAppsScript: {
		createSheetUrl: import.meta.env.PUBLIC_CREATE_SHEET_URL || "",
		fetchFromSheetUrl: import.meta.env.PUBLIC_FETCH_FROM_SHEET_URL || "",
		postToSheetUrl: import.meta.env.PUBLIC_POST_TO_SHEET_URL || "",
		timestampUrl: import.meta.env.PUBLIC_TIMESTAMP_URL || "",
	},
} as const;
