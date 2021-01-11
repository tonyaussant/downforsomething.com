/*
  Warnings:

  - The migration will change the primary key for the `Users` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `socketID` on the `Users` table. All the data in the column will be lost.
  - Added the required column `id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` DROP PRIMARY KEY,
    DROP COLUMN `socketID`,
    ADD COLUMN     `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
