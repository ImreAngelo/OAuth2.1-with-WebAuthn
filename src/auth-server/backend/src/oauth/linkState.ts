import { NextFunction, Request, Response } from "express";
import { UUID } from "node:crypto";
import chalk from 'chalk';
import { ValidatedRequest } from "./validate";
import { getSession } from "./session";


/**
 * Check if request is linked to oauth session via 'oauth_request_id' cookie
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export function linkState(req: Request, res: Response, next: NextFunction) {
    const { cookies } = req;
    const id : UUID = cookies.oauth_request_id; 
    const session = getSession(id);

    console.log(`Linking oauth '${id}' to session:`, session)

    if(session === undefined) {
        console.error(chalk.bold.red("❌ Invalid OAuth cookie"));
        res.status(300).json({ msg:'stale session' });
        return;
    }

    // const data = result.data;
    (req as ValidatedRequest).oauth = session;

    // TODO: Global loglevels/proper audit and logging
    console.log(chalk.green("✅ Linked OAuth state via cookie"));
    return next();
}