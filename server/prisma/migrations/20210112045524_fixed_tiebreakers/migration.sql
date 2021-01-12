/*
  Warnings:

  - You are about to drop the column `inTieBreaker` on the `Plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Plans` DROP COLUMN `inTieBreaker`,
    ADD COLUMN     `retryTotal` INT NOT NULL DEFAULT 0,
    ADD COLUMN     `randomTotal` INT NOT NULL DEFAULT 0,
    ADD COLUMN     `tieBreakersNeeded` INT NOT NULL DEFAULT 99;
