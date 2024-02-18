/*
  Warnings:

  - You are about to drop the column `desc` on the `WebsiteSection` table. All the data in the column will be lost.
  - Added the required column `description` to the `WebsiteSection` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebsiteSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kind" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "websiteId" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteSection" ("backgroundImage", "id", "kind", "title", "websiteId") SELECT "backgroundImage", "id", "kind", "title", "websiteId" FROM "WebsiteSection";
DROP TABLE "WebsiteSection";
ALTER TABLE "new_WebsiteSection" RENAME TO "WebsiteSection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
