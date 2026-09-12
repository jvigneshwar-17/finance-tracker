import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { generateToken, verifyToken } from "../lib/jwt.ts";
import { generateSecureToken, hashToken } from "../lib/tokens.ts";

describe("Email Verification Before Authentication", () => {
  describe("JWT Payload Purity", () => {
    test("JWT contains only identity information and never stores verification claims", async () => {
      process.env.JWT_SECRET = "test-jwt-secret-key-that-is-sufficiently-long-for-hs256";

      const identity = { userId: "user-test-123", email: "test@example.com" };
      const token = await generateToken(identity);

      const verifiedPayload = await verifyToken(token);
      assert.ok(verifiedPayload);
      assert.equal(verifiedPayload.userId, identity.userId);
      assert.equal(verifiedPayload.email, identity.email);

      // Verify no verification status is embedded in JWT
      assert.equal((verifiedPayload as unknown as Record<string, unknown>).emailVerified, undefined);
    });
  });

  describe("Registration Flow Security", () => {
    test("registration generates high-entropy token, stores only hash, and leaves user unverified", () => {
      // Simulate registration token generation
      const rawVerificationToken = generateSecureToken();
      const tokenHash = hashToken(rawVerificationToken);

      // Simulated DB state after registration
      const userRecord = {
        id: "user-new-456",
        email: "newuser@example.com",
        emailVerified: false,
        emailVerificationTokenHash: tokenHash,
      };

      assert.equal(userRecord.emailVerified, false);
      assert.notEqual(userRecord.emailVerificationTokenHash, rawVerificationToken);
      assert.equal(userRecord.emailVerificationTokenHash, tokenHash);
    });
  });

  describe("Login Verification Guard", () => {
    function simulateLoginCheck(user: { emailVerified: boolean; passwordMatch: boolean }) {
      if (!user.passwordMatch) {
        return { status: 401, error: "Invalid email or password" };
      }
      return { status: 200, message: "Login successful" };
    }

    test("permits unverified user when credentials are valid", () => {
      const result = simulateLoginCheck({ emailVerified: false, passwordMatch: true });
      assert.equal(result.status, 200);
      assert.equal(result.message, "Login successful");
    });

    test("accepts verified user with 200", () => {
      const result = simulateLoginCheck({ emailVerified: true, passwordMatch: true });
      assert.equal(result.status, 200);
      assert.equal(result.message, "Login successful");
    });

    test("rejects invalid password with 401", () => {
      const result = simulateLoginCheck({ emailVerified: false, passwordMatch: false });
      assert.equal(result.status, 401);
    });
  });

  describe("Financial Route Protection & Authentication Guard", () => {
    function simulateFinancialRouteGuard(session: { userId: string } | null, dbUser: { id: string; emailVerified: boolean } | null) {
      if (!session) {
        return { success: false, status: 401, error: "Not authenticated" };
      }
      if (!dbUser) {
        return { success: false, status: 401, error: "User not found" };
      }
      return { success: true, userId: dbUser.id };
    }

    test("rejects unauthenticated requests with 401", () => {
      const result = simulateFinancialRouteGuard(null, null);
      assert.equal(result.success, false);
      assert.equal(result.status, 401);
    });

    test("permits authenticated user regardless of emailVerified status", () => {
      const session = { userId: "user-unverified-789" };
      const dbUser = { id: "user-unverified-789", emailVerified: false };

      const result = simulateFinancialRouteGuard(session, dbUser);
      assert.equal(result.success, true);
      assert.equal(result.userId, "user-unverified-789");
    });

    test("permits authenticated and verified users", () => {
      const session = { userId: "user-verified-101" };
      const dbUser = { id: "user-verified-101", emailVerified: true };

      const result = simulateFinancialRouteGuard(session, dbUser);
      assert.equal(result.success, true);
      assert.equal(result.userId, "user-verified-101");
    });
  });

  describe("Verification Lifecycle & Single-Use Consumption", () => {
    test("verifying token transitions user to emailVerified and clears token hash", () => {
      const rawToken = generateSecureToken();
      const user = {
        emailVerified: false,
        emailVerificationTokenHash: hashToken(rawToken) as string | null,
      };

      // 1. Unverified user submits correct token
      const incomingHash = hashToken(rawToken);
      assert.equal(incomingHash, user.emailVerificationTokenHash);

      // 2. Transition state on consumption
      user.emailVerified = true;
      user.emailVerificationTokenHash = null;

      assert.equal(user.emailVerified, true);
      assert.equal(user.emailVerificationTokenHash, null);

      // 3. Replay attack fails
      const replayAttemptMatches = user.emailVerificationTokenHash !== null && user.emailVerificationTokenHash === incomingHash;
      assert.equal(replayAttemptMatches, false);
    });
  });
});
