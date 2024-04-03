-- CreateTable
CREATE TABLE "ThemeButton" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "ThemeButtonElem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "themeButtonId" INTEGER,
    CONSTRAINT "ThemeButtonElem_themeButtonId_fkey" FOREIGN KEY ("themeButtonId") REFERENCES "ThemeButton" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
