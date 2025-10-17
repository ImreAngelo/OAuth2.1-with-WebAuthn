import { Express, Request, Response } from "express";
import WebAuthn from "@webauthn";
import OAuth from "@oauth";
// TODO: Improve interface
import { start } from "@users/register/start";

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

    // First-Party User Registration
    // TODO: Link to session to prevent leaking information about ongoing registrations
    app.post("/user/register/start", [start])
}