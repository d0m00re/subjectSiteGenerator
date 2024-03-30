/*
  Warnings:

  - Added the required column `name` to the `ThemePalette` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ThemePalette" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "themeGroupId" INTEGER,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "ThemePalette_themeGroupId_fkey" FOREIGN KEY ("themeGroupId") REFERENCES "ThemeGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ThemePalette_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ThemePalette" ("id", "themeGroupId", "userId") SELECT "id", "themeGroupId", "userId" FROM "ThemePalette";
DROP TABLE "ThemePalette";
ALTER TABLE "new_ThemePalette" RENAME TO "ThemePalette";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
