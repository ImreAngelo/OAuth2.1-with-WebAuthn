const { build } = require("esbuild");

/** Production build */
const isOptimizeFlag = process.argv.includes("--optimize");

build({
	entryPoints: ["src/index.ts"],
	outfile: "build/index.js",
	bundle: true,
	platform: "node",
	define: {
		"process.env.NODE_ENV": '"production"' // JSON.stringify(process.env.NODE_ENV || "development")
	},
	sourcemap: false,
	minify: true
}).then(() => {
  	console.log("✅ Build succeeded");
});
