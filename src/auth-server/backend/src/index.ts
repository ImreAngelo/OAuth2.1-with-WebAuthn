import express, { Request, Response } from "express";
import path from "path";
import * as routes from "./routes";

const app = express();

const IS_PRODUCTION = (process.env.NODE_ENV === "production");
const FRONTEND_RELATIVE_PATH = "../../frontend/build";
const PORT = process.env.PORT || 3000;

/** 
 * Serve static site in production, and reverse proxy in development 
 * TODO: Maybe overkill for this scenario, just use SSR in prod and dev?
 **/
if (IS_PRODUCTION) {
	// Serve statically generated frontend
	const frontendPath = path.join(__dirname, FRONTEND_RELATIVE_PATH);
	app.use(express.static(frontendPath));
	app.get("/", (_req, res) => {
		res.sendFile(path.join(frontendPath, "index.html"));
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

// Keep routes defined in routes.ts for readability
routes.register(app);

// Start listening
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
