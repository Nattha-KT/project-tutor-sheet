-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sid_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sid_fkey" FOREIGN KEY ("sid") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;
