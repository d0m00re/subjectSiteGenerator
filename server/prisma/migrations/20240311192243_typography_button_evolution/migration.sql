/*
  Warnings:

  - You are about to drop the column `description` on the `WebsiteSection` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `WebsiteSection` table. All the data in the column will be lost.
  - Added the required column `animation` to the `TemplateElemTypography` table without a default value. This is not possible if the table is not empty.
  - Added the required column `decorator` to the `TemplateElemTypography` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `TemplateElemTypography` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animation` to the `TemplateElemButton` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shape` to the `TemplateElemButton` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `TemplateElemButton` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant` to the `TemplateElemButton` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundColor` to the `WebsiteSection` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TemplateElemImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "filter" TEXT NOT NULL,
    "radius" INTEGER NOT NULL,
    "animation" TEXT NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "TemplateElemImage_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WebsiteTheme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemplateElemTypography" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "animation" TEXT NOT NULL,
    "decorator" TEXT NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "TemplateElemTypography_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TemplateElemTypography" ("id", "order", "path", "text", "variant", "websiteSectionId") SELECT "id", "order", "path", "text", "variant", "websiteSectionId" FROM "TemplateElemTypography";
DROP TABLE "TemplateElemTypography";
ALTER TABLE "new_TemplateElemTypography" RENAME TO "TemplateElemTypography";
CREATE TABLE "new_TemplateElemButton" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "animation" TEXT NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "TemplateElemButton_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TemplateElemButton" ("actionType", "id", "label", "order", "path", "websiteSectionId") SELECT "actionType", "id", "label", "order", "path", "websiteSectionId" FROM "TemplateElemButton";
DROP TABLE "TemplateElemButton";
ALTER TABLE "new_TemplateElemButton" RENAME TO "TemplateElemButton";
CREATE TABLE "new_WebsiteSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kind" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "configTemplateId" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WebsiteSection_configTemplateId_fkey" FOREIGN KEY ("configTemplateId") REFERENCES "TemplateVariant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteSection" ("backgroundImage", "configTemplateId", "id", "kind", "websiteId") SELECT "backgroundImage", "configTemplateId", "id", "kind", "websiteId" FROM "WebsiteSection";
DROP TABLE "WebsiteSection";
ALTER TABLE "new_WebsiteSection" RENAME TO "WebsiteSection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
