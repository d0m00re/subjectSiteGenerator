/*
  Warnings:

  - You are about to drop the column `themeButtonId` on the `Website` table. All the data in the column will be lost.
  - Added the required column `websiteId` to the `ThemeButton` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ThemeButton" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "websiteId" INTEGER NOT NULL,
    CONSTRAINT "ThemeButton_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ThemeButton" ("id") SELECT "id" FROM "ThemeButton";
DROP TABLE "ThemeButton";
ALTER TABLE "new_ThemeButton" RENAME TO "ThemeButton";
CREATE UNIQUE INDEX "ThemeButton_websiteId_key" ON "ThemeButton"("websiteId");
CREATE TABLE "new_Website" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "themePaletteId" INTEGER NOT NULL,
    "themeFontId" INTEGER NOT NULL,
    CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Website_themePaletteId_fkey" FOREIGN KEY ("themePaletteId") REFERENCES "ThemePalette" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Website_themeFontId_fkey" FOREIGN KEY ("themeFontId") REFERENCES "ThemeFont" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Website" ("id", "subject", "themeFontId", "themePaletteId", "title", "userId") SELECT "id", "subject", "themeFontId", "themePaletteId", "title", "userId" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
