import { Express, Request, Response } from "express";
import validate from "./oauth/validate";
import startSession from "./oauth/session";
import sendLoginZeroRTT from "./webauthn/sendLoginZeroRTT";

export function register(app: Express) {
    app.get("/test", (_req: Request, res: Response) => {
        console.log("Test route was accessed.")
        res.send("Hello World")
    })

    app.get("/", [validate, startSession])

    // Send WebAuthn login options early to avoid 1 extra round-trip
    app.get("/", sendLoginZeroRTT)
}