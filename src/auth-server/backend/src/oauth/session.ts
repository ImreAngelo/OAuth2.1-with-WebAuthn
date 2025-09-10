import { randomUUID, UUID } from "node:crypto";
import AuthorizationRequest from "./AuthorizationRequest";
import { NextFunction, Request, Response } from "express";
import { ValidatedRequest } from "./validate";
import { debugPrint } from "./helpers";
import chalk from "chalk";

// TODO: In production, consider using a cache for a distributed system
const sessions = new Map<UUID, Session>();

type Session = AuthorizationRequest & {
    timer: NodeJS.Timeout;
}

/**
 * 
 * @param params 
 * @param maxTime 
 */
export function makeSession(params: AuthorizationRequest, maxTime = 300000) {
    const id = randomUUID();

    sessions.set(id, {
        ...params, // Keep session alive for 5 minutes
        timer: setTimeout(() => sessions.delete(id), maxTime)
    });

    console.log(chalk.bold.yellow("UUID: "), id)
    debugPrint(params);
}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export default function startSession(req: Request, res: Response, next: NextFunction) {
    const oauth = (req as ValidatedRequest).oauth;
    
    makeSession(oauth);

    return next();
}