/*
  Warnings:

  - Changed the type of `lead_type` on the `Lead` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('INBOUND', 'OUTBOUND', 'REFERRAL');

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "lead_type",
ADD COLUMN     "lead_type" "LeadType" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'NEW';
