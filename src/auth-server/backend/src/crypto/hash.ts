import { createHash } from 'crypto';

/**
 * Hashes an input string using SHA-256.
 * @param input - The input string to hash (e.g., an email address).
 * @returns The hex-encoded SHA-256 hash.
 */
export default function hash(input: string): string {
	const normalized = input.trim().toLowerCase(); // normalize
	const hash = createHash('sha256');
	hash.update(normalized, 'utf8');
	return hash.digest('hex'); // returns 64-character hex string
}