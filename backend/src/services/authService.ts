import type { cookieSchema } from "@routes/authRoutes";
import type { Context } from "elysia";
import { jwtVerify } from "jose";
import { LogsService } from "./logsService";

const logger = new LogsService();
interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}

export class AuthService {
    CLIENT_ID = process.env.CLIENT_ID ?? ""
    CLIENT_SECRET = process.env.CLIENT_SECRET ?? ""

    AUTHORIZE_URL = process.env.AUTHORIZE_URL ?? "http://sso.domain.com/application/o/authorize/"
    TOKEN_URL = process.env.TOKEN_URL ?? "http://sso.domain.com/application/o/token/"
    REDIRECT_URI = process.env.REDIRECT_URI ?? "http://localhost/auth/callback"
    ALGORITHM = process.env.ALGORITHM ?? "HS256"
    ISSUER = process.env.ISSUER ?? "http://sso.domain.com/application/o/"
    FRONTEND_URL = process.env.FRONTEND_URL ?? "http://app.localhost/"

    API_KEY = process.env.API_KEY

    async getAuthorization() {
        const url = new URL(this.AUTHORIZE_URL);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("client_id", this.CLIENT_ID);
        url.searchParams.set("redirect_uri", this.REDIRECT_URI);
        url.searchParams.set("scope", "openid profile email offline_access");

        return Response.redirect(url.toString());
    }

    async getTokenByCode(code: string, cookie: typeof cookieSchema) {
        const params = new URLSearchParams({
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': this.REDIRECT_URI,
            'client_id': this.CLIENT_ID,
            'client_secret': this.CLIENT_SECRET
        });

        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        const response = await fetch(this.TOKEN_URL, {
            method: 'POST',
            headers: headers,
            body: params.toString()
        });

        const data = await response.json() as TokenResponse;

        const refresh_token = data["refresh_token"] ?? "";
        if (!refresh_token) {
            throw new Error("No refresh token received");
        }

        cookie.refresh_token.set({
            value: refresh_token,
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });

        return Response.redirect(this.FRONTEND_URL);
    }

    async refreshToken(refresh_token: string, cookie: typeof cookieSchema) {
        const params = new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': this.CLIENT_ID,
            'client_secret': this.CLIENT_SECRET,
        });

        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        const response = await fetch(this.TOKEN_URL, {
            method: 'POST',
            headers: headers,
            body: params.toString()
        })
        const data = await response.json();

        if (!data.access_token && !data.refresh_token) {
            cookie.refresh_token.set({ value: "", path: "/", maxAge: 0 });
            logger.warning("Refresh token invalid or expired", { refresh_token });
            throw new Error("Invalid refresh token, please log in again");
        }

        cookie.refresh_token.set({
            value: data.refresh_token,
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // optional, 30 days
        });

        return data;
    }


    // Auth middleware
    async authMiddleware(ctx: Context) {
        try {
            const { user } = await this.validateRequest(ctx);
            ctx.request.user = user;
            ctx.set.status = 200
        } catch (err) {
            ctx.set.status = 401
            logger.error("Authentication failed", { error: (err as Error).message });
            throw new Response(JSON.stringify({ error: (err as Error).message }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }
    };

    async validateRequest(ctx: Context) {
        const { request, cookie, path } = ctx;

        if (path.startsWith("/auth") || path === "/swagger" || path === "/") {
            return { user: null };
        }
        const apiKey = request.headers.get("x-api-key");

        if (this.API_KEY && apiKey === this.API_KEY) return { user: { api: true } };

        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];

        try {
            const payload = await jwtVerify(token, new TextEncoder().encode(this.CLIENT_SECRET), {
                issuer: this.ISSUER,
                audience: this.CLIENT_ID,
                algorithms: [this.ALGORITHM],
            }).then(r => r.payload);
            return { user: payload };

        } catch {
            if (!cookie) {
                logger.error("Missing token in cookies", { path, cookies: cookie });
                throw new Error("Missing token, please log in");
            }
            const refresh = cookie.refresh_token?.value ?? "";

            if (!refresh) throw new Error("Session expired, please log in again");
            const newTokens = await this.refreshToken(refresh, cookie);
            if (!newTokens) throw new Error("Missing access token and invalid refresh token");
            const payload = await jwtVerify(newTokens.access_token, new TextEncoder().encode(this.CLIENT_SECRET), {
                issuer: this.ISSUER,
                audience: this.CLIENT_ID,
                algorithms: [this.ALGORITHM],
            }).then(r => r.payload)
                .catch(() => { throw new Error("Invalid access token") });
            return { user: payload };
        }
    }

}
