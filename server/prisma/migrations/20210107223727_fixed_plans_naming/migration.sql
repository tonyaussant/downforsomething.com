/*
  Warnings:

  - The migration will change the primary key for the `Plans` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Plans` table. All the data in the column will be lost.
  - You are about to drop the column `option1` on the `Plans` table. All the data in the column will be lost.
  - You are about to drop the column `option2` on the `Plans` table. All the data in the column will be lost.
  - You are about to drop the column `option3` on the `Plans` table. All the data in the column will be lost.
  - You are about to drop the column `choicesMade` on the `Plans` table. All the data in the column will be lost.
  - You are about to drop the column `currentPhase` on the `Plans` table. All the data in the column will be lost.
  - Added the required column `planCode` to the `Plans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `users_ibfk_1`;

-- AlterTable
ALTER TABLE `Plans` DROP PRIMARY KEY,
    DROP COLUMN `code`,
    DROP COLUMN `option1`,
    DROP COLUMN `option2`,
    DROP COLUMN `option3`,
    DROP COLUMN `choicesMade`,
    DROP COLUMN `currentPhase`,
    ADD COLUMN     `planCode` VARCHAR(191) NOT NULL,
    ADD COLUMN     `option1Total` INT NOT NULL DEFAULT 0,
    ADD COLUMN     `option2Total` INT NOT NULL DEFAULT 0,
    ADD COLUMN     `option3Total` INT NOT NULL DEFAULT 0,
    ADD COLUMN     `choicesTotal` INT NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`planCode`);

-- AddForeignKey
ALTER TABLE `Users` ADD FOREIGN KEY (`planCode`) REFERENCES `Plans`(`planCode`) ON DELETE CASCADE ON UPDATE CASCADE;
