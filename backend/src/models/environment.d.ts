declare global {
  namespace NodeJS {
    interface ProcessEnv {
        AUTHORIZE_URL: string,
        TOKEN_URL: string,
        REDIRECT_URI: string,
        JWKS_URL: string,
        ALGORITHM: string
    }
  }
}

export {}