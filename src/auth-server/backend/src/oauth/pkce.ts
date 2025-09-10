/**
 * Verify PKCE challenge/verifier pair
 * @param challenge 
 * @param verifier 
 * @returns true if challenge matches verifier processed with method
 */
export default async function verifyPKCEChallenge(challenge: string, verifier: string, method: "plain" | "S256") {
    const compare = (method === "S256") 
        ? await generateCodeChallenge(verifier)
        : verifier;

    return compare === challenge;
}

/**
 * Hash verifier using SHA256
 * @param verifier String to hash
 * @returns SHA256 hash of verifier
 */
async function generateCodeChallenge(verifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(new Uint8Array(digest));
}

/**
 * Convert bytes to base64 chars
 * @param buffer Byte buffer
 * @returns Base64 encoded string
 */
function base64UrlEncode(buffer: Uint8Array<ArrayBuffer>) {
    return btoa(String.fromCharCode(...buffer))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}