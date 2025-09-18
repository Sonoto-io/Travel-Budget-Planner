-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_currencyId_fkey";

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "currencyId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "currencyId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
