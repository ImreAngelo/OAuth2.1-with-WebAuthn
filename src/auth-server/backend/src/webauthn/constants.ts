/**
 * Human-readable title for your website
 */
export const rpName = 'OAuth 2.1 + WebAuthn Example';

/**
 * A unique identifier for your website. 'localhost' is okay for local dev
 */
export const rpID = 'localhost';

/**
 * The URL at which registrations and authentications should occur.
 * 'http://localhost' and 'http://localhost:PORT' are also valid.
 * Do NOT include any trailing /
 */
export const origin = `https://${rpID}`;