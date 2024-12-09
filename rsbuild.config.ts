import { defineConfig } from "@rsbuild/core";
import { pluginPreact } from "@rsbuild/plugin-preact";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";

export default defineConfig({
	plugins: [pluginPreact()],
	tools: {
		rspack: {
			plugins: [TanStackRouterRspack()],
		},
	},
});
