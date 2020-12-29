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
CREATE TABLE `Link` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `parentID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Phase2` ADD FOREIGN KEY (`parentID`) REFERENCES `Phase1`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Link` ADD FOREIGN KEY (`parentID`) REFERENCES `Phase2`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
