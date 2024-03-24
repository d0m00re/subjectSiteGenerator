/*
  Warnings:

  - Added the required column `filename` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalname` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Library" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "size" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Library_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Library" ("encoding", "id", "isPublic", "mimetype", "path", "size", "sourceType", "userId") SELECT "encoding", "id", "isPublic", "mimetype", "path", "size", "sourceType", "userId" FROM "Library";
DROP TABLE "Library";
ALTER TABLE "new_Library" RENAME TO "Library";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
