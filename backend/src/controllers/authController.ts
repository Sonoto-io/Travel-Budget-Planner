import { AuthService } from "@services/authService";
import { cookieSchema } from "@routes/authRoutes";
import { sessionsRepository } from "@repositories/sessionsRepository";

export const authService = new AuthService()

export const authController = {
  async getAuthorization(native: boolean) {
    return authService.getAuthorization(native);
  },
  async callback(providerCode : string, state: string | null, cookie: typeof cookieSchema) {
    const account = await authService.getUserData(providerCode, cookie);
    return authService.redirectWithTmpCode(account.provider_subject, state, account.username);
  },
  finalizeAuthentication(code: string, cookie: typeof cookieSchema) {
    return authService.finalizeAuthentication(code, cookie);
  },
  verifySession(cookie: typeof cookieSchema) {
    const sessionToken = cookie.session;
    if (!sessionToken.value) {
      return { valid: false };
    }
    // clean sessions
    sessionsRepository.deleteExpiredSessions().catch(() => { /* ignore errors */ });
    const response = sessionsRepository.verifySession(sessionToken.value)
      .then(valid => ({ valid }))
      .catch(() => ({ valid: false }));
      if (!response) {
        cookie.session = undefined;
      }
    return response;
  },
};
