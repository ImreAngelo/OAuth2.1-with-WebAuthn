import { describe, expect, it } from "vitest";

import CipherGCM from "./CipherGCM";

describe("CipherGCM", () => {
        // TODO: This test is kindof pointless...
        it("stores fields when constructed with discrete values", () => {
                const cipher = new CipherGCM("iv-value", "tag-value", "ciphertext-value");

                expect(cipher.iv).toBe("iv-value");
                expect(cipher.tag).toBe("tag-value");
                expect(cipher.ciphertext).toBe("ciphertext-value");
                expect(cipher.toString()).toBe("iv-value:tag-value:ciphertext-value");
        });

        it("parses serialized values when provided as a single string", () => {
                const cipher = new CipherGCM("iv:tag:ciphertext");

                expect(cipher.iv).toBe("iv");
                expect(cipher.tag).toBe("tag");
                expect(cipher.ciphertext).toBe("ciphertext");
        });

        it("throws an error when given an invalid serialized string", () => {
                expect(() => new CipherGCM("missing-sections"))
                        .toThrowError('Invalid CipherGCM string format. Expected "iv:tag:ciphertext"');
        });
})