/*
  Warnings:

  - Added the required column `themePaletteOrder` to the `WebsiteSection` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebsiteSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "backgroundImage" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "configTemplateId" INTEGER NOT NULL,
    "themePaletteOrder" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WebsiteSection_configTemplateId_fkey" FOREIGN KEY ("configTemplateId") REFERENCES "TemplateVariant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteSection" ("backgroundColor", "backgroundImage", "configTemplateId", "id", "websiteId", "themePaletteOrder") SELECT "backgroundColor", "backgroundImage", "configTemplateId", "id", "websiteId", 0 FROM "WebsiteSection";
DROP TABLE "WebsiteSection";
ALTER TABLE "new_WebsiteSection" RENAME TO "WebsiteSection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
