-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Website" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "themePaletteId" INTEGER NOT NULL,
    "themeFontId" INTEGER NOT NULL,
    "themeButtonId" INTEGER,
    CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Website_themePaletteId_fkey" FOREIGN KEY ("themePaletteId") REFERENCES "ThemePalette" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Website_themeFontId_fkey" FOREIGN KEY ("themeFontId") REFERENCES "ThemeFont" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Website_themeButtonId_fkey" FOREIGN KEY ("themeButtonId") REFERENCES "ThemeButton" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Website" ("id", "subject", "themeFontId", "themePaletteId", "title", "userId") SELECT "id", "subject", "themeFontId", "themePaletteId", "title", "userId" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
