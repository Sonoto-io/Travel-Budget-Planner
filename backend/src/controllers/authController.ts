import { AuthService } from "@services/authService";
import { cookieSchema } from "@routes/authRoutes";
import { sessionsRepository } from "@repositories/sessionsRepository";

export const authService = new AuthService()

export const authController = {
  async getAuthorization(query: Object) {
    const native = query 
      && 'state' in query 
      && query.state 
      && 'platform' in query.state 
      && query.state.platform === "native";
      
    return authService.getAuthorization(native);
  },
  async callback(providerCode : string, native: boolean, cookie: typeof cookieSchema) {
    const account = await authService.getUserData(providerCode, cookie);
    return authService.redirectWithTmpCode(account.provider_subject, native, account.username);
  },
  finalizeAuthentication(code: string, cookie: typeof cookieSchema) {
    return authService.finalizeAuthentication(code, cookie);
  },
  verifySession(cookie: typeof cookieSchema) {
    const sessionToken = cookie.session;
    console.log("cookies = ", cookie)
    console.log("Verifying session token:", sessionToken.value);
    if (!sessionToken.value) {
      return { valid: false };
    }
    // clean sessions
    sessionsRepository.deleteExpiredSessions().catch(() => { /* ignore errors */ });
    console.log("Session token found, verifying...");
    const response = sessionsRepository.verifySession(sessionToken.value)
      .then(valid => ({ valid }))
      .catch(() => ({ valid: false }));
      if (!response) {
        cookie.session = undefined;
      }
    return response;
  },
};
