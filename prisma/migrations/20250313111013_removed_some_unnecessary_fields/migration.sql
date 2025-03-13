/*
  Warnings:

  - You are about to drop the column `city` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "city",
DROP COLUMN "state",
DROP COLUMN "zip";
