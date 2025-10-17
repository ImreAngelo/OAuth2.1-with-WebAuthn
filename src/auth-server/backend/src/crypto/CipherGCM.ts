/**
 * Encrypted data with tag
 */
export default class CipherGCM {
	public iv: string;
	public tag: string;
	public ciphertext: string;

	constructor(iv: string, tag: string, ciphertext: string);
	constructor(serialized: string);
	constructor(iv_serialized: string, tag?: string, ciphertext?: string) {
		if (tag !== undefined && ciphertext !== undefined) {
			// Normal constructor: iv, tag, ciphertext
			this.iv = iv_serialized;
			this.tag = tag;
			this.ciphertext = ciphertext;
		} else {
			// Single-string constructor: parse from string
			const parts = iv_serialized.split(':');
			if (parts.length !== 3) {
				throw new Error('Invalid CipherGCM string format. Expected "iv:tag:ciphertext"');
			}
			[this.iv, this.tag, this.ciphertext] = parts;
		}
	}

	/**
	 * Serialize data for storage
	 * @returns colon-delimited list in order: iv, tag, ciphertext
	 */
	toString(): string {
		return [this.iv, this.tag, this.ciphertext].join(':');
	}
}