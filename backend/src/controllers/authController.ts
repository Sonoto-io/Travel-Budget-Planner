import type { Prisma } from "@prisma/client";
import { t } from "elysia";
import { AuthService } from "@services/authService";
import { cookieSchema } from "@routes/authRoutes";

export const authService = new AuthService()

export const authController = {
  async getAuthorization() {
    return authService.getAuthorization();
  },
  async callback(code : string, cookie: typeof cookieSchema) {
    return authService.getTokenByCode(code, cookie);
  },
  async refreshToken(request: Request, cookie: typeof cookieSchema) {
    const cookieHeader = request.headers.get("cookie") || "";
    const refreshToken = cookieHeader.split("; ").find(row => row.startsWith("refresh_token="))?.split("=")[1];
    if (!refreshToken) {
      return { error: "No refresh token" };
    }
    return authService.refreshToken(refreshToken, cookie);
  },
};
