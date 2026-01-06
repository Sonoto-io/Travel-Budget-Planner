-- DropForeignKey
ALTER TABLE "Config" DROP CONSTRAINT "Config_currencyId_fkey";

-- DropIndex
DROP INDEX "Config_currencyId_key";

-- CreateTable
CREATE TABLE "AuthLoginCode" (
    "code" TEXT NOT NULL,
    "accountId" UUID NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),

    CONSTRAINT "AuthLoginCode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "provider_subject" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_subject_key" ON "Account"("provider_subject");

-- AddForeignKey
ALTER TABLE "Config" ADD CONSTRAINT "Config_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthLoginCode" ADD CONSTRAINT "AuthLoginCode_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
