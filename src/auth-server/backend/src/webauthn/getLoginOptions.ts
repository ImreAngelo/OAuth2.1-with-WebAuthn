// /webauthn/login/get-options
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { NextFunction, Request, Response } from "express";
import { ValidatedRequest } from "../oauth/validate";
import { rpID } from './constants';

export async function getLoginOptions(req: ValidatedRequest, res: Response, next: NextFunction) : Promise<void>;
export async function getLoginOptions(req: Request, res: Response, next: NextFunction) : Promise<void>;

/**
 * Send WebAuthn authentication options
 */
export default async function getLoginOptions(req: ValidatedRequest | Request, res: Response, next: NextFunction) {
    const request = req as ValidatedRequest;
    const { state } = request.oauth;
    
	// const passkeys = await Database.query('CALL get_passkeys()').selectOne();

    const options: PublicKeyCredentialRequestOptionsJSON = await generateAuthenticationOptions({
        rpID,
        // Require users to use a previously-registered authenticator
        allowCredentials: [] 
        // passkeys.map(passkey => ({
        //     id: passkey.id,
        //     transports: passkey.transports,
        // })),
    });

    // (Pseudocode) Remember this challenge for this user
    // login_sessions.set(state, options.challenge);

	res.status(200).json(options);
}