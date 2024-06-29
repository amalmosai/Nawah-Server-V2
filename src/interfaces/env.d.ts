import {Secret}from 'jsonwebtoken';

export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // [key: string]: string | undefined;
            PORT: number;
            MONGO_URL: string;
            JWT_SECRET :Secret;
            NODE_ENV : string;
            STRIPE_SECRET_KEY: string;
            LOG_FILE_PATH:string;
        }
    }
}

