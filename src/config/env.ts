export const config = {
	isDev: import.meta.env.DEV,
	googleAppsScript: {
		url: import.meta.env.PUBLIC_GOOGLE_APPS_SCRIPT_URL || "",
	},
	recaptcha: {
		siteKey: import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || "",
		secretKey: import.meta.env.RECAPTCHA_SECRET_KEY || "",
	},
} as const;
