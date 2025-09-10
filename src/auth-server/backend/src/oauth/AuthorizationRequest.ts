import * as z from "zod";

/** Allowed characters per RFC3986 "unreserved": A-Z a-z 0-9 - . _ ~ */
const unreservedRegex = /^[A-Za-z0-9\-._~]+$/;

/**
 * OAuth 2.1 request parameter validation scheme defined in
 * 
 * https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13#authorization-request
 */
export const Schema = z.object({
    response_type: z
        .literal("code", "response_type was included but was not 'code'")
        .optional(),

    client_id: z.string()
        .min(1, "client_id is required")
        .regex(unreservedRegex, "client_id contains invalid characters"),        

    code_challenge: z.string()
        .min(43, "code_challenge must be at least 43 chars")
        .max(128, "code_challenge must be at most 128 chars")
        .regex(unreservedRegex, "code_challenge contains invalid characters"),

    code_challenge_method: z.enum(
        ["plain","S256"], 
        "code_challenge_method must be 'plain' or 'S256'",
    ),
    
    // OPTIONAL if only one redirect URI is registered for this client. 
    // REQUIRED if multiple redirict URIs are registered for this client.
    redirect_uri: z
        .url("redirect_uri is not a valid URL")
        .transform((val) => new URL(val)),
        // TODO: need to add %3A to regex for URL query params ":" etc.
        // .regex(unreservedRegex, "redirect_uri contains invalid characters"),
        // .optional(), 

    scope: z.string().optional(),

    state: z.string().optional(),
});

/** https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13#authorization-request */
type AuthorizationRequest = z.infer<typeof Schema>;
export default AuthorizationRequest;