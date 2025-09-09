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

    // TODO: Global loglevels
    console.log(chalk.bold.yellow("OAuth Parameters"));
    paddedPrint([
        ["Client ID:", data.client_id],
        ["Redirect URI:", data.redirect_uri],
        ["Challenge:", data.code_challenge],
        ["PKCE Method:", data.code_challenge_method],
    ]);

    console.log(chalk.green("✅ Valid OAuth parameters"));

    (req as any).oauthParams = data;
    
    // TODO: Save session for 5 minutes
    return next();
}

// TODO: Move to helpers
function paddedPrint(entries: [string, string][]) {
    // Find the longest label length
    const maxLabelLength = Math.max(...entries.map(([label]) => label.length));

    for (const [label, value] of entries) {
        const paddedLabel = label.padEnd(maxLabelLength, " ");
        console.log(chalk.bold(paddedLabel), value);
    }
}