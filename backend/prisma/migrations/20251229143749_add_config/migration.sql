-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "date" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "currencyId" UUID,
    "enableBackground" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_currencyId_key" ON "Config"("currencyId");

-- AddForeignKey
ALTER TABLE "Config" ADD CONSTRAINT "Config_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- InsertDefaultConfig
INSERT INTO "Config" (id, "currencyId", "enableBackground")
SELECT
    1,
    NULL,
    true
WHERE NOT EXISTS (
    SELECT 1 FROM "Config" WHERE id = 1
);
