import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
// import webpackStatsPlugin from 'rollup-plugin-webpack-stats';

export default defineConfig({
  plugins: [ 
	solid(), 
	// webpackStatsPlugin({ // TODO: Conditionally only export stat file when --analyze flag set
	// 	fileName: "../artifacts/frontend.webpack-stats.json",
	// 	excludeAssets: /\.map$/,
	// }) 
],
  server: {
		port: 5173
	},
	build: {
		outDir: "../build/public",
		emptyOutDir: true, // must be true to overwrite outdir since it is outside the project dir (../)
    	sourcemap: true,
	}
})
