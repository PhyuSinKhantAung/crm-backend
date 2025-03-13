/*
  Warnings:

  - You are about to drop the column `lead_type` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "lead_type";

-- DropEnum
DROP TYPE "LeadType";
