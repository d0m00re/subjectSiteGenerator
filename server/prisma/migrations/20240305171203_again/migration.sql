/*
  Warnings:

  - Added the required column `templateGroupId` to the `TemplateVariant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemplateVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "config" TEXT NOT NULL,
    "templateGroupId" INTEGER NOT NULL,
    CONSTRAINT "TemplateVariant_templateGroupId_fkey" FOREIGN KEY ("templateGroupId") REFERENCES "TemplateGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TemplateVariant" ("config", "id", "kind", "name") SELECT "config", "id", "kind", "name" FROM "TemplateVariant";
DROP TABLE "TemplateVariant";
ALTER TABLE "new_TemplateVariant" RENAME TO "TemplateVariant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
