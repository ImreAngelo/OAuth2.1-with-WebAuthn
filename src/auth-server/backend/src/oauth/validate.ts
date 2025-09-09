import { NextFunction, Request, Response } from "express";
import chalk from 'chalk';
import Schema from "./Schema";

/**
 * Verify OAuth URL parameters
 * @param req
 * @param res 
 */
export default function validate(req: Request, res: Response, next: NextFunction) {
    // the parsed result is validated and type safe!
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

    // TODO: If dev mode -> Set chalk as dev dependency?
    console.log(chalk.bold.yellow("OAuth Parameters"));
    console.log(chalk.bold("Client ID: "), data.client_id);
    console.log(chalk.bold("Redirect URI: "), data.redirect_uri);
    console.log(chalk.bold("Challenge: "), data.code_challenge);
    console.log(chalk.bold("PKCE Method: "), data.code_challenge_method);
    console.log(chalk.green("✅ Valid OAuth parameters"));

    (req as any).oauthParams = data;

    return next();
}

