import { Prisma } from "@generated/client";
import { prismaClient } from "./prismaClient";

const prisma = prismaClient;

export const authLoginCodesRepository = {

    async create(authCodeData: Prisma.AuthLoginCodeCreateInput) {
      return await prisma.authLoginCode.create({ 
        data: authCodeData });
    },
    async get(code: string) {
        return await prisma.authLoginCode.findUnique({ where: { code: code } });
    },
    async isCodeValid(code: string):  Promise<boolean> {
        return prisma.authLoginCode.findUnique({ where: { code: code, expires_at: { gt: new Date() } } })
          .then(authLoginCode => authLoginCode !== null);
    },
    async cleanOldCodes() {
        return await prisma.authLoginCode.deleteMany({ where: { expires_at: { lt: new Date() } } });
    },
    async deleteCode(code: string) {
        return await prisma.authLoginCode.deleteMany({ where: { code: code } });
    }
}
