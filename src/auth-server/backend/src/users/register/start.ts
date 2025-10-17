import { Request, Response } from "express";
import { Schema } from "./UserType";
import { hash } from "@crypto";
import Database from "@database";
import sessions from "./session";
import chalk from "chalk";

/**
 * Start a registration session
 * Cannot complete registration without webauthn keys
 * TODO: Provide backup keys and complete registration instantly
 * @param req Express request object
 * @param res Express response object
 */
export async function start(req: Request, res: Response) {
    // Validate input
    const result = Schema.safeParse(req.body);

    if(!result.success) {
        console.error(chalk.bold.red("❌ Invalid registration parameters"));
        console.error(result.error);
        return makeError(res, result.error.message);
    }
    
    const data = result.data;
    
    // Check cache
    if(sessions.has(data.name)) {
        console.error("Could not make registration: ", data);
        console.error("Registration already exists: ", sessions.get(data.name));
        return makeError(res, "An unexpected error occurred, please try again later");
    }

    // Check database
    const mailHash = hash(data.mail); 
    const exists = await Database.query('SELECT * FROM authn.Users WHERE mail_hash=?', [mailHash]).exists();
    if(exists) {
        console.error("User is already registered (or hash collision): ", data.mail, mailHash);
        return makeError(res);
    }
    
    // Add to cache now, add to database later (after adding keys)
    console.error(chalk.bold.green("Registration session started"));
    sessions.set(data.mail, data);
    res.status(200).send({ success: true });
}

function makeError(res: Response, msg: string = "An unexprected error occurred") {
    return res.status(400).json({
        success: false,
        error: "Could not register user",
        details: msg,
    });
}