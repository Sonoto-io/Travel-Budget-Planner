import { type Account, type Session } from "@generated/client";
import { prismaClient } from "./prismaClient";

const prisma = prismaClient;

export const sessionsRepository = {
    async create(account: Account): Promise<Session | null> {
        return await prisma.session.create({
            data: {
                account: { connect: { id: account.id } },
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            }
        });
    },
    async verifySession(sessionToken: string): Promise<boolean> {
        const session = await prisma.session.findUnique({
            where: { id: sessionToken },
        });
        if (!session) {
            return false;
        }
        return session.expiresAt > new Date();
    },
    async deleteExpiredSessions(): Promise<number> {
        const result = await prisma.session.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });
        return result.count;
    }

}
