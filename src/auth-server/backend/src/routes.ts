import { Express, Request, Response } from "express";
import validate from "./oauth/validate";
import startSession from "./oauth/session";

export function register(app: Express) {
    app.get("/test", (_req: Request, res: Response) => {
        console.log("Test route was accessed.")
        res.send("Hello World")
    })

    app.get("/", [validate, startSession])
}