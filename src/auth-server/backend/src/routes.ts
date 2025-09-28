import { Express, Request, Response } from "express";
import validate from "./oauth/validate";
import startSession from "./oauth/session";
import linkState from "./oauth/linkState";
import getLoginOptions from "./webauthn/getLoginOptions";
// import sendLoginZeroRTT from "./webauthn/sendLoginZeroRTT";

export function register(app: Express) {
    app.get("/test", (_req: Request, res: Response) => {
        console.log("Test route was accessed.")
        res.send("Hello World")
    })

    app.get("/authorize", [validate, startSession])

    // TODO: Send WebAuthn login options early to avoid 1 extra round-trip
    // app.get("/", sendLoginZeroRTT)

    app.post("/webauthn/login/options", [linkState, getLoginOptions])
}