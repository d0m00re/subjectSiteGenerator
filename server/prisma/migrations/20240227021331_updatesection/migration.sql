/*
  Warnings:

  - Added the required column `websiteId` to the `WebsiteSectionOrder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebsiteSectionOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    "websiteId" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSectionOrder_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WebsiteSectionOrder_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteSectionOrder" ("id", "order", "websiteSectionId") SELECT "id", "order", "websiteSectionId" FROM "WebsiteSectionOrder";
DROP TABLE "WebsiteSectionOrder";
ALTER TABLE "new_WebsiteSectionOrder" RENAME TO "WebsiteSectionOrder";
CREATE UNIQUE INDEX "WebsiteSectionOrder_websiteSectionId_key" ON "WebsiteSectionOrder"("websiteSectionId");
CREATE UNIQUE INDEX "WebsiteSectionOrder_websiteId_key" ON "WebsiteSectionOrder"("websiteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
