// @ts-check
import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import { fileURLToPath, URL } from "node:url";

// エントリを src/pages/ 外に置くことで、本番ビルドへの混入と
// Vite モジュールグラフ経由での他ページ :global() スタイルの混入を防ぐ。
/** @returns {import('astro').AstroIntegration} */
function devPagesIndex() {
	return {
		name: "dev-pages-index",
		hooks: {
			"astro:config:setup": ({ command, injectRoute }) => {
				if (command !== "dev") return;
				injectRoute({
					pattern: "/",
					entrypoint: new URL("./src/dev/index.astro", import.meta.url),
				});
			},
		},
	};
}

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs(), devPagesIndex()],
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
