-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebsiteSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kind" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "websiteId" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteSection" ("backgroundImage", "description", "id", "kind", "title", "websiteId") SELECT "backgroundImage", "description", "id", "kind", "title", "websiteId" FROM "WebsiteSection";
DROP TABLE "WebsiteSection";
ALTER TABLE "new_WebsiteSection" RENAME TO "WebsiteSection";
CREATE TABLE "new_WebsiteSectionOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    "websiteId" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSectionOrder_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WebsiteSectionOrder_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteSectionOrder" ("id", "order", "websiteId", "websiteSectionId") SELECT "id", "order", "websiteId", "websiteSectionId" FROM "WebsiteSectionOrder";
DROP TABLE "WebsiteSectionOrder";
ALTER TABLE "new_WebsiteSectionOrder" RENAME TO "WebsiteSectionOrder";
CREATE UNIQUE INDEX "WebsiteSectionOrder_websiteSectionId_key" ON "WebsiteSectionOrder"("websiteSectionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
