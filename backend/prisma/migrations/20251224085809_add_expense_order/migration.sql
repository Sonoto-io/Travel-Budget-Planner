/*
  Warnings:

  - A unique constraint covering the columns `[date,order]` on the table `Expense` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Add the "order" column
ALTER TABLE "Expense" ADD COLUMN "order" INTEGER;
UPDATE "Expense" SET "order" = 0 WHERE "order" IS NULL;
ALTER TABLE "Expense" ALTER COLUMN "order" SET NOT NULL;
ALTER TABLE "Expense" ALTER COLUMN "order" SET DEFAULT 0;
ALTER TABLE "Expense" ALTER COLUMN "date" SET DATA TYPE DATE;


-- CreateIndex
CREATE INDEX "Expense_date_order_idx" ON "Expense"("date", "order");