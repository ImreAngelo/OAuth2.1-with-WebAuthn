const { build } = require("esbuild");

/** Production build */
const isOptimizeFlag = process.argv.includes("--optimize");

build({
	entryPoints: ["src/index.ts"],
	bundle: true,
	platform: "node",
	sourcemap: !isOptimizeFlag,
	outfile: "dist/index.js",
}).then(() => {
  	console.log("✅ Build succeeded");
});
