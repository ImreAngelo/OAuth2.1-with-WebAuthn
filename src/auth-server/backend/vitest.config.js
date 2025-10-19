import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		coverage: {
      		reportsDirectory: './coverage',
			reporter: ['json-summary', 'text', 'html'],
			include: ['src/**'],
			exclude:[
				...configDefaults.exclude,
				'**/helpers.ts',
				'src/index.ts',
			]
		},
	},
	resolve: {
		alias: {
			"@crypto": "/src/crypto",
			"@database": "/src/database",
			"@oauth": "/src/oauth",
			"@users": "/src/users",
			"@webauthn": "/src/webauthn",
		},
	},
});