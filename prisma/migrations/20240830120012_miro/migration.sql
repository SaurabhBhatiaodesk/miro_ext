-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "accountOwner" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,
    "collaborator" BOOLEAN DEFAULT false,
    "emailVerified" BOOLEAN DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "searchClass" (
    "id" SERIAL NOT NULL,
    "shop" TEXT NOT NULL,
    "integration_id" TEXT NOT NULL,
    "resultClassName" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "suggestionSearch" TEXT NOT NULL,
    "htmlSuggestion" TEXT NOT NULL,
    "filterhide" TEXT NOT NULL,
    "sortingfilterhide" TEXT NOT NULL,
    "recordnumberhide" TEXT NOT NULL,

    CONSTRAINT "searchClass_pkey" PRIMARY KEY ("id")
);
