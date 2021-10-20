-- CreateTable
CREATE TABLE `Phase1` (
    `id` VARCHAR(191) NOT NULL,
    `option` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phase2` (
    `id` VARCHAR(191) NOT NULL,
    `option` INTEGER NOT NULL,
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
    `option1Total` INTEGER NOT NULL DEFAULT 0,
    `option2Total` INTEGER NOT NULL DEFAULT 0,
    `option3Total` INTEGER NOT NULL DEFAULT 0,
    `option4Total` INTEGER NOT NULL DEFAULT 0,
    `option5Total` INTEGER NOT NULL DEFAULT 0,
    `choicesTotal` INTEGER NOT NULL DEFAULT 0,
    `choicesNeeded` INTEGER NOT NULL DEFAULT 99,
    `retryTotal` INTEGER NOT NULL DEFAULT 0,
    `randomTotal` INTEGER NOT NULL DEFAULT 0,
    `tieBreakersTotal` INTEGER NOT NULL DEFAULT 0,
    `tieBreakersNeeded` INTEGER NOT NULL DEFAULT 99,
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
    `planCode` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
