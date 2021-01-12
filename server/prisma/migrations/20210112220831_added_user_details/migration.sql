-- AlterTable
ALTER TABLE `Users` ADD COLUMN     `phase1Done` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN     `phase2Done` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN     `tieBreakerDone` BOOLEAN NOT NULL DEFAULT false;
