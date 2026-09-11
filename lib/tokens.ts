import { createHash } from "node:crypto";

/**
 * Generates a cryptographically secure, high-entropy 32-byte (64 hex character) token.
 */
export function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Computes a deterministic SHA-256 hash of an authentication token.
 * Tokens must be hashed before storage in the database to protect against data breaches.
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
