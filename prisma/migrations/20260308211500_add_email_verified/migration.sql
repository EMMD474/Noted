ALTER TABLE "auth_user"
ADD COLUMN IF NOT EXISTS "email_verified" TIMESTAMP(3);
