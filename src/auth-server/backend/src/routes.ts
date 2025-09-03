import { Express, Request, Response } from "express";

export function register(app: Express) {
    app.get("/test", (_req: Request, res: Response) => {
        res.send("Hello World")
    })
}