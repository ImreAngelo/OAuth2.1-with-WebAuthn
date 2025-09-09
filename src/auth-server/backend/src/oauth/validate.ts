import { assert } from "console";
import { NextFunction, Request, Response } from "express";
import chalk from 'chalk';
import { rootCertificates } from "tls";

/**
 * Verify OAuth URL parameters
 * @param req
 * @param res 
 */
export default function validate(req: Request, res: Response, next: NextFunction) {
    const { client_id, redirect_uri, code_challenge, code_challenge_method } = req.query

    console.log(chalk.bold.red("OAuth Parameters"))
    console.log(chalk.bold("Client ID: "), client_id)
    console.log(chalk.bold("Redirect URI: "), redirect_uri)
    console.log(chalk.bold("Challenge: "), code_challenge)
    console.log(chalk.bold("PKCE Method: "), code_challenge_method)
    
    // TODO: Input validation!!!

    console.log(chalk.green("✅ Validated OAuth parameters"))
    next('/')
}
