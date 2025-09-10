import { NextFunction, Request, Response } from "express";

/**
 * Send WebAuthn login options pre-emptively 
 */
export default function sendLoginZeroRTT(req: Request, res: Response, next: NextFunction) {
    // TODO: Just use SSR to include JSON in initial request
    return next();
}