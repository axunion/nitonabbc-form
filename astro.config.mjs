// @ts-check
import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import { fileURLToPath, URL } from "node:url";

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs()],
	vite: {
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		css: {
			transformer: "lightningcss",
			lightningcss: {
				drafts: {
					customMedia: true,
				},
			},
		},
		build: {
			cssMinify: "lightningcss",
		},
	},
});
