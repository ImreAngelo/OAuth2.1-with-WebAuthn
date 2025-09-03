import request from "supertest";
import express from "express";
import * as routes from "./routes";

describe("Express app", () => {
	it("Server is up and responding", async () => {
		// Inline app for unit test
		const app = express();
        routes.register(app);

		const response = await request(app).get("/test");
		expect(response.status).toBe(200);
		expect(response.text).toBe("Hello World");
	});
});