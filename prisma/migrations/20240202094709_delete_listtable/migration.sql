/*
  Warnings:

  - You are about to drop the `FavoriteList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoriteList" DROP CONSTRAINT "FavoriteList_userId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_sheetId_fkey";

-- DropIndex
DROP INDEX "User_sid_key";

-- DropTable
DROP TABLE "FavoriteList";

-- DropTable
DROP TABLE "List";

-- CreateTable
CREATE TABLE "Favorite" (
    "userId" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","sheetId")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
