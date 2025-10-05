import { build } from "esbuild";

/** Export metafile when this flag is set */
const isAnalyzeFlagSet = process.argv.includes("--analyze");

build({
	entryPoints: ["src/index.ts"],
	outfile: "../build/index.js",
	bundle: true,
	platform: "node",
	target: "node24",
	define: {
		"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
	},
	alias: {
		"@": "./src/",
	},
	sourcemap: false,
	minify: true,
	metafile: isAnalyzeFlagSet,
	// plugins: [
	// 	esbuildPluginAnalyzer({
	// 		// summaryOnly: true, // only show total + per-dep size
	// 		json: true // to generate a report.json too
	// 	})
	// ]
})
.then(result => {
	if(!isAnalyzeFlagSet) return;

	// Save the metafile
	const fs = require('fs');
	fs.writeFileSync('../build/artifacts/backend.metafile.json', JSON.stringify(result.metafile));
	console.log("✅ Exported metafile")
})
.then(() => console.log("✅ Build succeeded"))
.catch((error) => console.log(`❌ Build failed: ${error}`))
