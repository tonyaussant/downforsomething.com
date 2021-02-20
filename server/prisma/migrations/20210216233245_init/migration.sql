-- CreateTable
CREATE TABLE `Phase1` (
    `id` VARCHAR(191) NOT NULL,
    `option` INT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phase2` (
    `id` VARCHAR(191) NOT NULL,
    `option` INT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `parentID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Results` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `parentID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plans` (
    `planCode` VARCHAR(191) NOT NULL,
    `option1Total` INT NOT NULL DEFAULT 0,
    `option2Total` INT NOT NULL DEFAULT 0,
    `option3Total` INT NOT NULL DEFAULT 0,
    `option4Total` INT NOT NULL DEFAULT 0,
    `option5Total` INT NOT NULL DEFAULT 0,
    `choicesTotal` INT NOT NULL DEFAULT 0,
    `choicesNeeded` INT NOT NULL DEFAULT 99,
    `retryTotal` INT NOT NULL DEFAULT 0,
    `randomTotal` INT NOT NULL DEFAULT 0,
    `tieBreakersTotal` INT NOT NULL DEFAULT 0,
    `tieBreakersNeeded` INT NOT NULL DEFAULT 99,
    `roomOpen` BOOLEAN NOT NULL DEFAULT true,
    `randomGenerated` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`planCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phase1Done` BOOLEAN NOT NULL DEFAULT false,
    `phase2Done` BOOLEAN NOT NULL DEFAULT false,
    `tieBreakerDone` BOOLEAN NOT NULL DEFAULT false,
    `planCode` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Phase2` ADD FOREIGN KEY (`parentID`) REFERENCES `Phase1`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Results` ADD FOREIGN KEY (`parentID`) REFERENCES `Phase2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD FOREIGN KEY (`planCode`) REFERENCES `Plans`(`planCode`) ON DELETE SET NULL ON UPDATE CASCADE;
