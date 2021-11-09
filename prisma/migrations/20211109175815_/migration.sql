/*
  Warnings:

  - You are about to drop the column `choicesNeeded` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `choicesTotal` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `tieBreakersNeeded` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `tieBreakersTotal` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Plan` DROP COLUMN `choicesNeeded`,
    DROP COLUMN `choicesTotal`,
    DROP COLUMN `tieBreakersNeeded`,
    DROP COLUMN `tieBreakersTotal`;
