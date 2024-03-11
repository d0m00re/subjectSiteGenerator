/*
  Warnings:

  - You are about to drop the column `label` on the `TemplateElemButton` table. All the data in the column will be lost.
  - Added the required column `text` to the `TemplateElemButton` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemplateElemButton" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "animation" TEXT NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "TemplateElemButton_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TemplateElemButton" ("actionType", "animation", "id", "order", "path", "shape", "size", "variant", "websiteSectionId") SELECT "actionType", "animation", "id", "order", "path", "shape", "size", "variant", "websiteSectionId" FROM "TemplateElemButton";
DROP TABLE "TemplateElemButton";
ALTER TABLE "new_TemplateElemButton" RENAME TO "TemplateElemButton";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
