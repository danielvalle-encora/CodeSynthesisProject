import * as dotenv from 'dotenv';

export interface EnvConfig {
    accessTokenSecret: string;
    refreshTokenSecret: string;
    databaseUrl: string;
}

export function loadConfig(): EnvConfig {
    dotenv.config();
    return {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
        databaseUrl: process.env.DATABASE_URL!
    };
}