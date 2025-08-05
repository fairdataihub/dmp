-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "givenName" TEXT NOT NULL DEFAULT '',
    "familyName" TEXT NOT NULL DEFAULT '',
    "emailAddress" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerifiedAt" TIMESTAMP(3),
    "emailVerificationToken" TEXT,
    "emailVerificationTokenExpires" TIMESTAMP(3),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundInfo" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "roles" TEXT[],
    "otherRole" TEXT,
    "roleDuration" TEXT NOT NULL,
    "dmpCount" TEXT NOT NULL,
    "dmpReviewFrequency" TEXT NOT NULL,
    "dmsFamiliarity" TEXT NOT NULL,
    "aiUsage" TEXT NOT NULL,
    "aiComfort" TEXT NOT NULL,
    "aiAttitude" TEXT NOT NULL,
    "additionalComments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BackgroundInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "dmpName" TEXT NOT NULL,
    "evaluations" JSONB NOT NULL,
    "overallAuthorshipGuess" TEXT,
    "overallSatisfaction" INTEGER,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerificationToken_key" ON "User"("emailVerificationToken");

-- CreateIndex
CREATE INDEX "User_emailAddress_idx" ON "User"("emailAddress");

-- CreateIndex
CREATE INDEX "BackgroundInfo_participantId_idx" ON "BackgroundInfo"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_participantId_dmpName_key" ON "Evaluation"("participantId", "dmpName");
