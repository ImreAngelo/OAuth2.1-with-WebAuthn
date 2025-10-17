import express, { Request, Response } from "express";
import cookieParser from 'cookie-parser';
import bodyparser from 'body-parser';
import path from "path";
import * as routes from "./routes";

const IS_PRODUCTION = (process.env.NODE_ENV === "production");
const PUBLIC_PATH = "./public";
const PORT = process.env.PORT || 3000;

const app = express();

// TODO: Use a secret key retrieved from vault
app.use(cookieParser());
app.use(bodyparser.json());

// Keep routes defined in routes.ts for readability
routes.register(app);

/** 
 * Serve static site in production, and reverse proxy in development 
 * TODO: Maybe overkill for this scenario, just use SSR in prod and dev?
 **/
if (IS_PRODUCTION) {
	// TODO: Serve statically generated frontend
	const assetsPath = path.join(__dirname, PUBLIC_PATH);
	app.use(express.static(assetsPath, { index:'index.html' }));
	
	// FALLBACK for non-root paths (TODO: Statically generate pages + 404 handling)
	app.get("/{*r}", (req, res) => {
		console.log("[Fallback] Serving route: ", req.path);
		res.sendFile(path.join(assetsPath, "index.html"));
	});
} else {
	(async () => { // Only load this dependency in dev mode
		const { createProxyMiddleware } = await import("http-proxy-middleware");
		app.use(
			"/",
			createProxyMiddleware<Request, Response>({
				target: "http://localhost:5173",
				changeOrigin: true,
				ws: true
			})
		);
	})();
}

// Start listening
app.listen(PORT, () => {
	console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
