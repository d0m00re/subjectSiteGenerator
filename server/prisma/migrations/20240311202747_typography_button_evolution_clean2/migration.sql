/*
  Warnings:

  - You are about to drop the column `kind` on the `WebsiteSection` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebsiteSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "backgroundImage" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "configTemplateId" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WebsiteSection_configTemplateId_fkey" FOREIGN KEY ("configTemplateId") REFERENCES "TemplateVariant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteSection" ("backgroundColor", "backgroundImage", "configTemplateId", "id", "websiteId") SELECT "backgroundColor", "backgroundImage", "configTemplateId", "id", "websiteId" FROM "WebsiteSection";
DROP TABLE "WebsiteSection";
ALTER TABLE "new_WebsiteSection" RENAME TO "WebsiteSection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
