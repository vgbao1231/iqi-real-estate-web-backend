-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'MARKETING', 'SALE');

-- CreateEnum
CREATE TYPE "public"."PartnerCategory" AS ENUM ('DEVELOPER', 'INTERNATIONAL', 'BANK');

-- CreateEnum
CREATE TYPE "public"."ArticleCategory" AS ENUM ('MARKET', 'LAW', 'INVESTMENT', 'RESORT', 'BANK');

-- CreateEnum
CREATE TYPE "public"."ArticleType" AS ENUM ('MACRO', 'MICRO');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'ADMIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "image" JSONB,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "public"."PartnerCategory" NOT NULL DEFAULT 'DEVELOPER',
    "shortDescription" TEXT,
    "description" TEXT,
    "countryCount" INTEGER,
    "agentCount" INTEGER,
    "projectCount" INTEGER,
    "partnershipYear" INTEGER,
    "specialties" JSONB,
    "achievements" JSONB,
    "benefits" JSONB,
    "image" JSONB,
    "loanRate" TEXT,
    "maxLoan" TEXT,
    "revenue" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "public"."ArticleType" NOT NULL DEFAULT 'MACRO',
    "content" TEXT,
    "category" "public"."ArticleCategory" NOT NULL DEFAULT 'MARKET',
    "readTime" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "image" JSONB,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "tags" JSONB,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" TEXT NOT NULL,
    "mainHotline" TEXT NOT NULL,
    "mainEmail" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "mainAddress" TEXT NOT NULL,
    "workingHours" TEXT,
    "socialMedia" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "Article_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "Article_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
