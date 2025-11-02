-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "configJson" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "targetId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numTrials" INTEGER NOT NULL DEFAULT 0,
    "numSuccess" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Quiz_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quizId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "success" BOOLEAN NOT NULL,
    CONSTRAINT "Trial_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Quiz_targetId_idx" ON "Quiz"("targetId");

-- CreateIndex
CREATE INDEX "Quiz_targetId_question_idx" ON "Quiz"("targetId", "question");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_targetId_question_answer_key" ON "Quiz"("targetId", "question", "answer");

-- CreateIndex
CREATE INDEX "Trial_quizId_createdAt_idx" ON "Trial"("quizId", "createdAt");
