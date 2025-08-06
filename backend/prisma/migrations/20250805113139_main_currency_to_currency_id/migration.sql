/*
  Warnings:

  - You are about to drop the column `main_currency` on the `Country` table. All the data in the column will be lost.
  - Added the required column `currencyId` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_main_currency_fkey";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "main_currency",
ADD COLUMN     "currencyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
