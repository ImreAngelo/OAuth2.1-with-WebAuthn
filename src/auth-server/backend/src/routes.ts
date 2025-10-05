import { Express, Request, Response } from "express";
// import { linkState, startSession, validate } from "@oauth";
import getLoginOptions from "./webauthn/login/getLoginOptions";
import OAuth from "@oauth";

export function register(app: Express) {
    app.get("/test", (_req: Request, res: Response) => {
        console.log("Test route was accessed")
        res.send("Hello World")
    })

    // OAuth 2.1
    app.get("/authorize", [OAuth.validate, OAuth.session.start])

    // WebAuthn
    app.post("/webauthn/register/options", [OAuth.session.link, getLoginOptions])
    app.post("/webauthn/login/options", [OAuth.session.link, getLoginOptions])
}