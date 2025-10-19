import { randomUUID, UUID } from "node:crypto";
import AuthorizationRequest from "./AuthorizationRequest";
import { NextFunction, Request, Response } from "express";
import { ValidatedRequest } from "./validate";
// import { debugPrint } from "./helpers";
import chalk from "chalk";
import { endpoint } from "@oauth";

// TODO: In production, consider using a cache for a distributed system
const sessions = new Map<UUID, Session>();

type Session = AuthorizationRequest & {
    timer: NodeJS.Timeout;
}

/**
 * Save request
 * TODO: Consider using distributed session store like redis
 * @param params 
 * @param maxTime 
 */
function makeSession(params: AuthorizationRequest, maxTime = 300000) {
    const id = randomUUID();

    sessions.set(id, {
        ...params, // Keep session alive for 5 minutes
        timer: setTimeout(() => removeSession(id, true), maxTime)
    });

    // console.log(chalk.bold.yellow("UUID: "), id)
    // debugPrint(params);

    return id;
}

/**
 * Remove stored request
 * @param id 
 * @param timeout 
 */
function removeSession(id: UUID, timeout: boolean = false) {
    if(timeout) console.error(chalk.red.bold(`Session '${id}' timed out`));
    else console.log(chalk.green(`Session '${id}' was terminated`))
    
    sessions.delete(id);
}

/**
 * Begin an OAuth session. Assumes "oauth" exists in request.
 * @param req 
 * @param res 
 * @param next 
 */
export function startSession(req: Request, res: Response, next: NextFunction) {
    const oauth = (req as ValidatedRequest).oauth;
    const sessionID = makeSession(oauth);
    const now = Date.now();
    const maxAge = 300000;  // Valid for 5 minutes
    
    (req as any).sessionID = sessionID;
    
    res.cookie('oauth_request_id', sessionID, {
        expires: new Date(now + maxAge),
        maxAge: maxAge,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        domain: process.env.DOMAIN,
        path: endpoint,
        partitioned: true, // Isolated per top-level site
        priority: "high",
    });

    return next();
}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function getSession(id: UUID) : Session | undefined {
    return sessions.get(id);
}