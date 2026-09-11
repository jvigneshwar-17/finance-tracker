import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { generateSecureToken, hashToken } from "../lib/tokens.ts";

describe("Authentication Token Security & Validation", () => {
  describe("generateSecureToken", () => {
    test("generates a 64-character hexadecimal token (32 bytes entropy)", () => {
      const token = generateSecureToken();
      assert.equal(typeof token, "string");
      assert.equal(token.length, 64);
      assert.match(token, /^[0-9a-f]{64}$/);
    });

    test("generates unique tokens across multiple invocations", () => {
      const tokens = new Set<string>();
      const iterations = 100;
      for (let i = 0; i < iterations; i++) {
        tokens.add(generateSecureToken());
      }
      assert.equal(tokens.size, iterations);
    });
  });

  describe("hashToken", () => {
    test("produces a 64-character hex SHA-256 digest", () => {
      const token = generateSecureToken();
      const hash = hashToken(token);
      assert.equal(typeof hash, "string");
      assert.equal(hash.length, 64);
      assert.match(hash, /^[0-9a-f]{64}$/);
    });

    test("is deterministic for identical input", () => {
      const token = generateSecureToken();
      const hash1 = hashToken(token);
      const hash2 = hashToken(token);
      assert.equal(hash1, hash2);
    });

    test("produces different hashes for distinct tokens", () => {
      const token1 = generateSecureToken();
      const token2 = generateSecureToken();
      const hash1 = hashToken(token1);
      const hash2 = hashToken(token2);
      assert.notEqual(hash1, hash2);
    });

    test("raw token does not match its hash", () => {
      const token = generateSecureToken();
      const hash = hashToken(token);
      assert.notEqual(token, hash);
    });

    test("matches Node.js createHash sha256 output", () => {
      const rawToken = "test-raw-token-1234567890abcdef";
      const expectedHash = createHash("sha256").update(rawToken).digest("hex");
      assert.equal(hashToken(rawToken), expectedHash);
    });
  });

  describe("Token Validation & Single-Use Lifecycle", () => {
    test("incoming raw token hashes match stored hash", () => {
      // 1. Generation phase (e.g. forgot-password or register)
      const rawTokenSentToUser = generateSecureToken();
      const storedTokenHashInDb = hashToken(rawTokenSentToUser);

      // 2. Verification phase (user submits raw token)
      const incomingRawTokenFromUser = rawTokenSentToUser;
      const computedHash = hashToken(incomingRawTokenFromUser);

      assert.equal(computedHash, storedTokenHashInDb);
    });

    test("tampered or corrupted raw token fails validation", () => {
      const rawTokenSentToUser = generateSecureToken();
      const storedTokenHashInDb = hashToken(rawTokenSentToUser);

      // User submits corrupted/tampered token
      const tamperedToken = rawTokenSentToUser.slice(0, -2) + "00";
      const computedHash = hashToken(tamperedToken);

      assert.notEqual(computedHash, storedTokenHashInDb);
    });

    test("single-use consumption: clearing token hash prevents reuse", () => {
      const rawToken = generateSecureToken();
      let storedHashInDb: string | null = hashToken(rawToken);

      // First use: lookup succeeds
      const firstLookupMatches = storedHashInDb === hashToken(rawToken);
      assert.equal(firstLookupMatches, true);

      // Consume token (set to null)
      storedHashInDb = null;

      // Second use: lookup fails because stored hash is null
      const secondLookupMatches = storedHashInDb !== null && storedHashInDb === hashToken(rawToken);
      assert.equal(secondLookupMatches, false);
    });

    test("expiration check validates active vs expired timestamps", () => {
      const now = new Date();
      const futureExpiry = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later
      const pastExpiry = new Date(now.getTime() - 1000); // 1 second ago

      const isFutureValid = futureExpiry.getTime() > now.getTime();
      const isPastValid = pastExpiry.getTime() > now.getTime();

      assert.equal(isFutureValid, true);
      assert.equal(isPastValid, false);
    });
  });
});
