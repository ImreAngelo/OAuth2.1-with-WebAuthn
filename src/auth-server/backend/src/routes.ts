import { Express, Request, Response } from "express";
import validate from "./oauth/validate";
import startSession from "./oauth/session";
import linkState from "./oauth/linkState";
import getLoginOptions from "./webauthn/login/getLoginOptions";
// import sendLoginZeroRTT from "./webauthn/sendLoginZeroRTT";

export function register(app: Express) {
    app.get("/test", (_req: Request, res: Response) => {
        console.log("Test route was accessed")
        res.send("Hello World")
    })

    // OAuth 2.1
    app.get("/authorize", [validate, startSession])

    // WebAuthn
    app.post("/webauthn/register/options", [linkState, getLoginOptions])
    app.post("/webauthn/login/options", [linkState, getLoginOptions])
}