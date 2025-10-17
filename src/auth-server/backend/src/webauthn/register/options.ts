import { generateRegistrationOptions } from '@simplewebauthn/server';
import { NextFunction, Request, Response } from "express";
import { ValidatedRequest } from "@oauth/validate";
import { rpID, rpName } from '@webauthn/constants';
import Database from '@database';

export async function getRegistrationOptions(req: ValidatedRequest, res: Response, next: NextFunction) : Promise<void>;
export async function getRegistrationOptions(req: Request, res: Response, next: NextFunction) : Promise<void>;

/**
 * Send WebAuthn authentication options
 */
export async function getRegistrationOptions(req: ValidatedRequest | Request, res: Response, next: NextFunction) {
    // const request = req as ValidatedRequest;
    // const { state } = request.oauth;
    const { key_name } = req.body;
    
	const passkeys = await Database.query('CALL get_passkeys()').selectOne();

    const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userName: key_name,
        attestationType: 'none',
        // Prevent users from re-registering existing authenticators
        excludeCredentials: passkeys.map((passkey: any) => ({
            id: passkey.id,
            transports: passkey.transports,
        })),
        // See "Guiding use of authenticators via authenticatorSelection"
        authenticatorSelection: {
            residentKey: 'preferred',
            userVerification: 'preferred',
        },
    });

    // (Pseudocode) Remember this challenge for this user
    // sessions.set(mail, options.challenge);

	res.status(200).json(options);
}