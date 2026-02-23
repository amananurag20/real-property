-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VISITOR', 'USER', 'AGENT', 'SERVICE_PROVIDER', 'ADMIN');

-- AlterTable: make email nullable, add new columns
ALTER TABLE "users"
  ALTER COLUMN "email" DROP NOT NULL,
  ADD COLUMN "phone" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "role" "Role" NOT NULL DEFAULT 'USER',
  ADD COLUMN "is_active" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "is_suspended" BOOLEAN NOT NULL DEFAULT false;

-- Remove the temporary default for phone after the column is added
ALTER TABLE "users" ALTER COLUMN "phone" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
