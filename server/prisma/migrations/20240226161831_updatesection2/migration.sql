-- CreateTable
CREATE TABLE "WebsiteSectionOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "websiteSectionId" INTEGER NOT NULL,
    CONSTRAINT "WebsiteSectionOrder_websiteSectionId_fkey" FOREIGN KEY ("websiteSectionId") REFERENCES "WebsiteSection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteSectionOrder_websiteSectionId_key" ON "WebsiteSectionOrder"("websiteSectionId");
