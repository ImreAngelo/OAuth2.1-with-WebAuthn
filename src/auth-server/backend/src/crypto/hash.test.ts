import { createHash } from "crypto";
import { describe, expect, it } from "vitest";

import hash from "./hash";

describe("hash", () => {
        it("produces the SHA-256 digest of the normalized input", () => {
                const input = "  Example@Email.Com  ";
                const expected = createHash("sha256")
                        .update("example@email.com", "utf8")
                        .digest("hex");

                expect(hash(input)).toBe(expected);
        });

        // TODO: Pointless test if we assume createHash works as intended,
        // otherwise we should also check against known hashes
        it("returns different hashes for distinct normalized inputs", () => {
                const first = hash("user@example.com");
                const second = hash("other@example.com");

                expect(first).not.toBe(second);
        });
});