import * as z from "zod";

/** Allowed characters per RFC3986 "unreserved": A-Z a-z 0-9 - . _ ~ */
const unreservedRegex = /^[A-Za-z0-9\-._~]+$/;

/**
 * OAuth 2.1 parameter validation scheme
 */
const Schema = z.object({
    client_id: z.string()
        .min(1, "client_id is required")
        .regex(unreservedRegex, "client_id contains invalid characters"),
    redirect_uri: z.url("redirect_uri is not a valid URL"),
        // TODO: need to add %3A to regex for URL query params ":" etc.
        // .regex(unreservedRegex, "redirect_uri contains invalid characters"), 
    code_challenge: z.string()
        .min(43, "code_challenge must be at least 43 chars")
        .max(128, "code_challenge must be at most 128 chars")
        .regex(unreservedRegex, "code_challenge contains invalid characters"),
    code_challenge_method: z.enum(
        ["plain","S256"], 
        "code_challenge_method must be 'plain' or 'S256'",
    ),
});

export default Schema;