/*
  Warnings:

  - You are about to drop the column `key` on the `ThemePaletteElem` table. All the data in the column will be lost.
  - Added the required column `order` to the `ThemePaletteElem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public` to the `ThemePaletteElem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ThemePaletteElem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "bgColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "themePaletteId" INTEGER,
    CONSTRAINT "ThemePaletteElem_themePaletteId_fkey" FOREIGN KEY ("themePaletteId") REFERENCES "ThemePalette" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ThemePaletteElem" ("bgColor", "id", "textColor", "themePaletteId") SELECT "bgColor", "id", "textColor", "themePaletteId" FROM "ThemePaletteElem";
DROP TABLE "ThemePaletteElem";
ALTER TABLE "new_ThemePaletteElem" RENAME TO "ThemePaletteElem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
