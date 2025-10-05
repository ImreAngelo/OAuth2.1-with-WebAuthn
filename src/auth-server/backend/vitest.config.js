import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		coverage: {
			reporter: ['json-summary', 'text'],
			include: ['src/**'],
		},
	},
});