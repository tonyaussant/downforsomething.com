-- CreateTable
CREATE TABLE `Plan` (
    `planId` VARCHAR(191) NOT NULL,
    `choicesTotal` INTEGER NOT NULL DEFAULT 0,
    `choicesNeeded` INTEGER NULL,
    `option1Total` INTEGER NOT NULL DEFAULT 0,
    `option2Total` INTEGER NOT NULL DEFAULT 0,
    `option3Total` INTEGER NOT NULL DEFAULT 0,
    `option4Total` INTEGER NOT NULL DEFAULT 0,
    `option5Total` INTEGER NOT NULL DEFAULT 0,
    `phase1Winner` INTEGER NULL,
    `phase2Winner` INTEGER NULL,
    `retryTotal` INTEGER NOT NULL DEFAULT 0,
    `randomTotal` INTEGER NOT NULL DEFAULT 0,
    `tieBreakersTotal` INTEGER NOT NULL DEFAULT 0,
    `tieBreakersNeeded` INTEGER NULL,
    `planStarted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`planId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `planId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phase1Done` BOOLEAN NOT NULL DEFAULT false,
    `phase2Done` BOOLEAN NOT NULL DEFAULT false,
    `tieBreakerDone` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
