-- CreateTable
CREATE TABLE "Phase1" (
    "id" TEXT NOT NULL,
    "option" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase2" (
    "id" TEXT NOT NULL,
    "option" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "parentID" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "parentID" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plans" (
    "planCode" TEXT NOT NULL,
    "option1Total" INTEGER NOT NULL DEFAULT 0,
    "option2Total" INTEGER NOT NULL DEFAULT 0,
    "option3Total" INTEGER NOT NULL DEFAULT 0,
    "option4Total" INTEGER NOT NULL DEFAULT 0,
    "option5Total" INTEGER NOT NULL DEFAULT 0,
    "choicesTotal" INTEGER NOT NULL DEFAULT 0,
    "choicesNeeded" INTEGER NOT NULL DEFAULT 99,
    "retryTotal" INTEGER NOT NULL DEFAULT 0,
    "randomTotal" INTEGER NOT NULL DEFAULT 0,
    "tieBreakersTotal" INTEGER NOT NULL DEFAULT 0,
    "tieBreakersNeeded" INTEGER NOT NULL DEFAULT 99,
    "roomOpen" BOOLEAN NOT NULL DEFAULT true,
    "randomGenerated" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("planCode")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phase1Done" BOOLEAN NOT NULL DEFAULT false,
    "phase2Done" BOOLEAN NOT NULL DEFAULT false,
    "tieBreakerDone" BOOLEAN NOT NULL DEFAULT false,
    "planCode" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Phase2" ADD FOREIGN KEY ("parentID") REFERENCES "Phase1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD FOREIGN KEY ("parentID") REFERENCES "Phase2"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD FOREIGN KEY ("planCode") REFERENCES "Plans"("planCode") ON DELETE SET NULL ON UPDATE CASCADE;
