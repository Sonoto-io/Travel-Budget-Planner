/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `expectedBudget` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count_days` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main_currency` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortname` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoryId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Country_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "expectedBudget",
DROP COLUMN "name",
ADD COLUMN     "count_days" INTEGER NOT NULL,
ADD COLUMN     "daily_expected_expenses" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "main_currency" TEXT NOT NULL,
ADD COLUMN     "shortname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "name",
DROP COLUMN "value",
ADD COLUMN     "currencyId" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "subcategoryId" UUID NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "label" TEXT;

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "conversion" DOUBLE PRECISION NOT NULL DEFAULT 1.00,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_label_key" ON "Currency"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_label_key" ON "Subcategory"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Category_label_key" ON "Category"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Country_label_key" ON "Country"("label");

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_main_currency_fkey" FOREIGN KEY ("main_currency") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
