import { Express, Request, Response } from "express";
import WebAuthn from "@webauthn";
import OAuth from "@oauth";

export function register(app: Express) {
    app.get("/test", (_req: Request, res: Response) => {
        console.log("Test route was accessed")
        res.send("Hello World")
    })

    // OAuth 2.1
    app.get("/authorize", [OAuth.validate, OAuth.session.start])

    // WebAuthn
    app.post("/webauthn/register/options", [OAuth.session.link, WebAuthn.register.getOptions])
    app.post("/webauthn/login/options", [OAuth.session.link, WebAuthn.login.getOptions])
}