-- CreateTable
CREATE TABLE "ThemeSectionSpacing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "top" TEXT NOT NULL DEFAULT 'medium',
    "bottom" TEXT NOT NULL DEFAULT 'medium',
    "horizontalAlign" TEXT NOT NULL DEFAULT 'center',
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "ThemeSectionSpacing_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ThemeSectionSpacing_websiteSectionId_key" ON "ThemeSectionSpacing"("websiteSectionId");
