/*
  Warnings:

  - You are about to alter the column `sheetId` on the `Rating` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_sheetId_fkey";

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "sheetId" DROP NOT NULL,
ALTER COLUMN "sheetId" SET DATA TYPE VARCHAR(50);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
