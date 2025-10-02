import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import * as routes from "./routes";

describe("Express app", () => {
	it("Server is up and responding", async () => {
		// TODO: Use same code as setup in index.ts
		//		 e.g. with cookie-parser etc.
		const app = express();
        routes.register(app);

		const response = await request(app).get("/test");
		expect(response.status).toBe(200);
		expect(response.text).toBe("Hello World");
	});
});