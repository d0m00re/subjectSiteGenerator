-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemplateElemTypography" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "animation" TEXT NOT NULL,
    "decorator" TEXT NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "TemplateElemTypography_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TemplateElemTypography" ("animation", "decorator", "id", "order", "path", "size", "text", "variant", "websiteSectionId") SELECT "animation", "decorator", "id", "order", "path", "size", "text", "variant", "websiteSectionId" FROM "TemplateElemTypography";
DROP TABLE "TemplateElemTypography";
ALTER TABLE "new_TemplateElemTypography" RENAME TO "TemplateElemTypography";
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
    CONSTRAINT "TemplateElemButton_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TemplateElemButton" ("actionType", "animation", "id", "order", "path", "shape", "size", "text", "variant", "websiteSectionId") SELECT "actionType", "animation", "id", "order", "path", "shape", "size", "text", "variant", "websiteSectionId" FROM "TemplateElemButton";
DROP TABLE "TemplateElemButton";
ALTER TABLE "new_TemplateElemButton" RENAME TO "TemplateElemButton";
CREATE TABLE "new_ThemePalette" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "themeGroupId" INTEGER,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "ThemePalette_themeGroupId_fkey" FOREIGN KEY ("themeGroupId") REFERENCES "ThemeGroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ThemePalette_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ThemePalette" ("id", "name", "themeGroupId", "userId") SELECT "id", "name", "themeGroupId", "userId" FROM "ThemePalette";
DROP TABLE "ThemePalette";
ALTER TABLE "new_ThemePalette" RENAME TO "ThemePalette";
CREATE TABLE "new_ThemePaletteElem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "bgColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "themePaletteId" INTEGER,
    CONSTRAINT "ThemePaletteElem_themePaletteId_fkey" FOREIGN KEY ("themePaletteId") REFERENCES "ThemePalette" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ThemePaletteElem" ("bgColor", "id", "order", "public", "textColor", "themePaletteId") SELECT "bgColor", "id", "order", "public", "textColor", "themePaletteId" FROM "ThemePaletteElem";
DROP TABLE "ThemePaletteElem";
ALTER TABLE "new_ThemePaletteElem" RENAME TO "ThemePaletteElem";
CREATE TABLE "new_TemplateElemImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "filter" TEXT NOT NULL,
    "radius" INTEGER NOT NULL,
    "animation" TEXT NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "TemplateElemImage_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TemplateElemImage" ("animation", "filter", "id", "order", "radius", "url", "websiteSectionId") SELECT "animation", "filter", "id", "order", "radius", "url", "websiteSectionId" FROM "TemplateElemImage";
DROP TABLE "TemplateElemImage";
ALTER TABLE "new_TemplateElemImage" RENAME TO "TemplateElemImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
