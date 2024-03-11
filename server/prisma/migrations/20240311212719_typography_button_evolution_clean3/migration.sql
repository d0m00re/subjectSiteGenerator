/*
  Warnings:

  - You are about to drop the column `kind` on the `TemplateVariant` table. All the data in the column will be lost.
  - Added the required column `description` to the `TemplateVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previewUrl` to the `TemplateVariant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemplateVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "previewUrl" TEXT NOT NULL,
    "config" TEXT NOT NULL,
    "templateGroupId" INTEGER NOT NULL,
    CONSTRAINT "TemplateVariant_templateGroupId_fkey" FOREIGN KEY ("templateGroupId") REFERENCES "TemplateGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TemplateVariant" ("config", "id", "name", "templateGroupId") SELECT "config", "id", "name", "templateGroupId" FROM "TemplateVariant";
DROP TABLE "TemplateVariant";
ALTER TABLE "new_TemplateVariant" RENAME TO "TemplateVariant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
