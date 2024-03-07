/*
  Warnings:

  - Added the required column `configTemplateId` to the `WebsiteSection` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TemplateGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kind" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TemplateVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "config" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TemplateElemTypography" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "variant" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "TemplateElemTypography_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TemplateElemButton" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "TemplateElemButton_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebsiteSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kind" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "configTemplateId" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WebsiteSection_configTemplateId_fkey" FOREIGN KEY ("configTemplateId") REFERENCES "TemplateVariant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteSection" ("backgroundImage", "description", "id", "kind", "title", "websiteId") SELECT "backgroundImage", "description", "id", "kind", "title", "websiteId" FROM "WebsiteSection";
DROP TABLE "WebsiteSection";
ALTER TABLE "new_WebsiteSection" RENAME TO "WebsiteSection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
