-- AlterTable
ALTER TABLE "users" RENAME COLUMN "passwordResetToken" TO "passwordResetTokenHash";
ALTER TABLE "users" RENAME COLUMN "emailVerificationToken" TO "emailVerificationTokenHash";

-- RenameIndex
ALTER INDEX "users_passwordResetToken_key" RENAME TO "users_passwordResetTokenHash_key";
ALTER INDEX "users_emailVerificationToken_key" RENAME TO "users_emailVerificationTokenHash_key";

-- Invalidate legacy unhashed plaintext tokens for security
UPDATE "users" SET "passwordResetTokenHash" = NULL, "passwordResetExpires" = NULL, "emailVerificationTokenHash" = NULL;
