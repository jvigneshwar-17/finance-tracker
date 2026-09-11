-- Grandfather existing accounts created before mandatory email verification
UPDATE "users" SET "emailVerified" = true WHERE "emailVerified" = false;
