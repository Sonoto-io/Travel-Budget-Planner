import { type Account, Prisma } from "@generated/client";
import { prismaClient } from "./prismaClient";

const prisma = prismaClient;

export const accountsRepository = {
    async get(id: string): Promise<Account | null> {
        return await prisma.account.findUnique({ where: { id: id } });
    },
    async findByProviderSubject(subject: string): Promise<Account | null> {
        return await prisma.account.findUnique({ where: { provider_subject: subject } });
    },
    async createIfNotExist(accountData: Prisma.AccountCreateInput): Promise<Account> {
      const existing = await prisma.account.findUnique({
        where: { provider_subject: accountData.provider_subject }
      });
      if (existing) return existing;
      return await prisma.account.create({ data: accountData }) as Account;
    },

}
