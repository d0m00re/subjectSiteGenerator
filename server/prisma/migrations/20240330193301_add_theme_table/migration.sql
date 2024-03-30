-- CreateTable
CREATE TABLE "ThemeGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ThemePalette" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "themeGroupId" INTEGER,
    "userId" INTEGER,
    CONSTRAINT "ThemePalette_themeGroupId_fkey" FOREIGN KEY ("themeGroupId") REFERENCES "ThemeGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ThemePalette_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ThemePaletteElem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "themePaletteId" INTEGER,
    CONSTRAINT "ThemePaletteElem_themePaletteId_fkey" FOREIGN KEY ("themePaletteId") REFERENCES "ThemePalette" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
