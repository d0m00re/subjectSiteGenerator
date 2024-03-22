declare namespace NodeJS {
    export interface ProcessEnv {
        DATABASE_URL: string;
        JWT_SECRET_KEY: string;
        JWT_REFRESH_TOKEN_KEY: string;
        OPENAI_API_KEY : string;
        OPENAI_ORGANIZATION_ID : string;
    } 
}