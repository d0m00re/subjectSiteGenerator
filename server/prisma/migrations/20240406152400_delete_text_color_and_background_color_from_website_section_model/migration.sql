/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `WebsiteSection` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundImage` on the `WebsiteSection` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebsiteSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "websiteId" INTEGER NOT NULL,
    "configTemplateId" INTEGER NOT NULL,
    "themePaletteOrder" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WebsiteSection_configTemplateId_fkey" FOREIGN KEY ("configTemplateId") REFERENCES "TemplateVariant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteSection" ("configTemplateId", "id", "themePaletteOrder", "websiteId") SELECT "configTemplateId", "id", "themePaletteOrder", "websiteId" FROM "WebsiteSection";
DROP TABLE "WebsiteSection";
ALTER TABLE "new_WebsiteSection" RENAME TO "WebsiteSection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
