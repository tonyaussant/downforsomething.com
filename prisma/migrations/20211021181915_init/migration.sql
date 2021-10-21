-- CreateTable
CREATE TABLE `Plan` (
    `planId` VARCHAR(191) NOT NULL,
    `choicesTotal` INTEGER NULL,
    `choicesNeeded` INTEGER NULL,
    `option1Total` INTEGER NULL,
    `option2Total` INTEGER NULL,
    `option3Total` INTEGER NULL,
    `option4Total` INTEGER NULL,
    `option5Total` INTEGER NULL,
    `phase1Winner` INTEGER NULL,
    `phase2Winner` INTEGER NULL,
    `retryTotal` INTEGER NULL,
    `randomTotal` INTEGER NULL,
    `tieBreakersTotal` INTEGER NULL,
    `tieBreakersNeeded` INTEGER NULL,
    `planStarted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`planId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `planId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `phase1Done` BOOLEAN NOT NULL DEFAULT false,
    `phase2Done` BOOLEAN NOT NULL DEFAULT false,
    `tieBreakerDone` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
