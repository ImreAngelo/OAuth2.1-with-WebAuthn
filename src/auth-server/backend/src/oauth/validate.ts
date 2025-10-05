import { NextFunction, Request, Response } from "express";
import chalk from 'chalk';
import AuthorizationRequest, { Schema } from "./AuthorizationRequest";

export type ValidatedRequest = Request & { oauth: AuthorizationRequest };

/**
 * Verify OAuth URL parameters before processing the request
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export function validate(req: Request, res: Response, next: NextFunction) {
    const result = Schema.safeParse(req.query);

    if(!result.success) {
        console.error(chalk.bold.red("❌ Invalid OAuth parameters"));
        console.error(result.error)

        return res.status(400).json({
            error: "Invalid OAuth 2.1 request parameters",
            details: result.error.message,
        });
    }
    
    const data = result.data;
    (req as ValidatedRequest).oauth = data;

    // TODO: Global loglevels/proper audit and logging
    console.log(chalk.green("✅ Valid OAuth parameters"));
    
    return next();
}