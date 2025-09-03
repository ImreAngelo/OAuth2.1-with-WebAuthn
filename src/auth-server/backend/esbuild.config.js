const esbuild = require("esbuild");

async function build() {
	const ctx = await esbuild.context({
		entryPoints: ["src/index.ts"],
		bundle: true,
		platform: "node",
		sourcemap: true,
		outfile: "dist/index.js",
	});
	if (process.argv.includes("--watch")) {
		await ctx.watch();
		console.log("👀 Watching for changes...");
	} else {
		await ctx.rebuild();
		await ctx.dispose();
		console.log("✅ Build complete");
	}
}

build().catch((err) => {
	console.error(err);
	process.exit(1);
});
