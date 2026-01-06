import type { cookieSchema } from "@routes/authRoutes";
import type { Context } from "elysia";
import { LogsService } from "./logsService";
import { authLoginCodesRepository } from "@repositories/authLoginCodesRepository";
import { accountsRepository } from "@repositories/accountsRepository";
import { authService } from "@controllers/authController";
import { sessionsRepository } from "@repositories/sessionsRepository";

const logger = new LogsService();

export class AuthService {
    CLIENT_ID = process.env.CLIENT_ID ?? ""
    CLIENT_SECRET = process.env.CLIENT_SECRET ?? ""

    AUTHORIZE_URL = process.env.AUTHORIZE_URL ?? "http://sso.domain.com/application/o/authorize/"
    TOKEN_URL = process.env.TOKEN_URL ?? "http://sso.domain.com/application/o/token/"
    REDIRECT_URI = process.env.REDIRECT_URI ?? "http://localhost/auth/callback"
    ALGORITHM = process.env.ALGORITHM ?? "HS256"
    ISSUER = process.env.ISSUER ?? "http://sso.domain.com/application/o/"
    FRONTEND_URL = process.env.FRONTEND_URL ?? "http://app.localhost"

    API_KEY = process.env.API_KEY

    async getAuthorization() {
        const url = new URL(this.AUTHORIZE_URL);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("client_id", this.CLIENT_ID);
        url.searchParams.set("redirect_uri", this.REDIRECT_URI);
        url.searchParams.set("scope", "openid profile email offline_access");

        return Response.redirect(url.toString());
    }

    async getUserData(code: string) {
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



        const idToken = response.ok ? response.json().then(data => data.id_token) : "";

        const payload = JSON.parse(
            Buffer.from((await idToken).split(".")[1], "base64").toString()
        );

        // add account creation here
        return await accountsRepository.createIfNotExist({
            username: payload.preferred_username,
            provider_subject: payload.sub,
            created_at: new Date(),
        }
        );

    }

    async redirectWithTmpCode(provider_subject: string, username: string) {
        // generate temp auth code and store in DB with expiration
        const tempAuthCode = await authService.createTempAuthCode(provider_subject, username);
        return Response.redirect(`${authService.FRONTEND_URL}/finalize-authentication?code=${tempAuthCode}`);
    }

    async createTempAuthCode(provider_subject: string, username: string) {
        // generate temp auth code and store in DB with expiration
        const code = crypto.randomUUID();

        let account = await accountsRepository.findByProviderSubject(provider_subject);
        if (!account) {
            // create account
            account = await accountsRepository.createIfNotExist({
                username: username,
                provider_subject: provider_subject,
                created_at: new Date(),
            });
        }

        try {
            await authLoginCodesRepository.create({
                code: code,
                expires_at: new Date(Date.now() + 60 * 1000), // 1 minute from now
                account: { connect: { id: account.id } },
            });
        } catch (error) {
            console.error("Error creating auth login code:", error);
            throw new Error("Could not create temporary authentication code");
        }

        return code;
    }
    async finalizeAuthentication(code: string, cookie: typeof cookieSchema) {
        // verify that code exists in DB
        const authLogin = await authLoginCodesRepository.get(code)

        if (!authLogin || authLogin.expires_at < new Date()) {
            throw new Error("Invalid or expired login code");
        }
        // exchange code for tokens
        await this.createSession(authLogin.accountId, cookie);
        // remove code from DB
        await authLoginCodesRepository.deleteCode(code)
        return;
    }

    // Create session and set cookies
    async createSession(accountId: string, cookie: typeof cookieSchema) {
        const account = await accountsRepository.get(accountId);

        if (!account) {
            throw new Error("Account not found for session creation");
        }
        // generate access and refresh tokens
        const session = await sessionsRepository.create(account);

        if (!session) {
            throw new Error("Could not create session");
        }

        cookie.session.set({
            value: session.id,
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        });
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

            
            if (!cookie) {
                logger.error("Missing session cookie", { path, cookies: cookie });
                throw new Error("Missing token, please log in");
            }

            const sessionToken = cookie.session;
            if (!sessionToken) {
                return { valid: false };
            }

            return sessionsRepository.verifySession(sessionToken.value)
                .then(valid => ({ valid }))
                .catch(() => ({ valid: false }));
        }

    }
