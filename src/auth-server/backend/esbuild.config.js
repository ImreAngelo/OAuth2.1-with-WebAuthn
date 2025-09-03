const { build } = require("esbuild");

build({
	entryPoints: ["src/index.ts"],
	outfile: "../build/index.js",
	bundle: true,
	platform: "node",
	target: "node24",
	define: {
		"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
	},
	sourcemap: false,
	minify: true
})
.then(() => console.log("✅ Build succeeded"))
.catch((error) => console.log(`❌ Build failed: ${error}`))
