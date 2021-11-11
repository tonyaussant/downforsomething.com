/*
  Warnings:

  - You are about to drop the column `choicesNeeded` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `choicesTotal` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `randomTotal` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `retryTotal` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `tieBreakersNeeded` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `tieBreakersTotal` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `tieBreakerDone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Plan` DROP COLUMN `choicesNeeded`,
    DROP COLUMN `choicesTotal`,
    DROP COLUMN `randomTotal`,
    DROP COLUMN `retryTotal`,
    DROP COLUMN `tieBreakersNeeded`,
    DROP COLUMN `tieBreakersTotal`,
    ADD COLUMN `tiedOptions` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `tieBreakerDone`;
