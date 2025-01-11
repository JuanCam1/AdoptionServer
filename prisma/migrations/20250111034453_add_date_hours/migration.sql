/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `FavoritePet` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `FavoritePost` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `dateComment` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursComment` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateFavorite` to the `FavoritePet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursFavorite` to the `FavoritePet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateFavorite` to the `FavoritePost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursFavorite` to the `FavoritePost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datePet` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursPet` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datePost` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursPost` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateEndSession` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateSession` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursEndSession` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursSession` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "dateComment" TEXT NOT NULL,
    "hoursComment" TEXT NOT NULL,
    CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("authorId", "content", "id", "postId") SELECT "authorId", "content", "id", "postId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_FavoritePet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "dateFavorite" TEXT NOT NULL,
    "hoursFavorite" TEXT NOT NULL,
    CONSTRAINT "FavoritePet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FavoritePet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FavoritePet" ("id", "petId", "userId") SELECT "id", "petId", "userId" FROM "FavoritePet";
DROP TABLE "FavoritePet";
ALTER TABLE "new_FavoritePet" RENAME TO "FavoritePet";
CREATE TABLE "new_FavoritePost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "dateFavorite" TEXT NOT NULL,
    "hoursFavorite" TEXT NOT NULL,
    CONSTRAINT "FavoritePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FavoritePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FavoritePost" ("id", "postId", "userId") SELECT "id", "postId", "userId" FROM "FavoritePost";
DROP TABLE "FavoritePost";
ALTER TABLE "new_FavoritePost" RENAME TO "FavoritePost";
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT,
    "description" TEXT,
    "adopted" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "datePet" TEXT NOT NULL,
    "hoursPet" TEXT NOT NULL,
    CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("adopted", "age", "breed", "description", "id", "name", "ownerId", "species") SELECT "adopted", "age", "breed", "description", "id", "name", "ownerId", "species" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "authorId" TEXT NOT NULL,
    "datePost" TEXT NOT NULL,
    "hoursPost" TEXT NOT NULL,
    "id_status" INTEGER DEFAULT 1,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status" ("id_status") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "content", "id", "id_status", "imageUrl", "title") SELECT "authorId", "content", "id", "id_status", "imageUrl", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateSession" TEXT NOT NULL,
    "hoursSession" TEXT NOT NULL,
    "dateEndSession" TEXT NOT NULL,
    "hoursEndSession" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("expires", "id", "sessionToken", "userId") SELECT "expires", "id", "sessionToken", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "telephone" TEXT,
    "id_status" INTEGER DEFAULT 1,
    CONSTRAINT "User_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status" ("id_status") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarUrl", "bio", "email", "id", "id_status", "name", "password", "telephone") SELECT "avatarUrl", "bio", "email", "id", "id_status", "name", "password", "telephone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
