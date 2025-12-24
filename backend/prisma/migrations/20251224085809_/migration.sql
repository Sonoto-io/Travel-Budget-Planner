/*
  Warnings:

  - A unique constraint covering the columns `[date,order]` on the table `Expense` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "order" INTEGER NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE INDEX "Expense_date_order_idx" ON "Expense"("date", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_date_order_key" ON "Expense"("date", "order");
