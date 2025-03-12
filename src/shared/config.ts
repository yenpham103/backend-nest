import z from 'zod';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config({
    path: ".env",
});

// Kiểm tra xem có file .env chưa?
if (!fs.existsSync(path.resolve(".env"))) {
    console.log("Không tìm thấy .env");
    process.exit(1);
}

const configSchema = z.object({
    DATABASE_URL: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRES_IN: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_EXPIRES_IN: z.string(),
    SECRET_API_KEY: z.string(),
    ADMIN_PASSWORD: z.string(),
    ADMIN_EMAIL: z.string(),
    ADMIN_NAME: z.string(),
    ADMIN_PHONE_NUMBER: z.string(),
    OTP_EXPIRES_IN: z.string(),
    RESEND_API_KEY: z.string(),
})

const configServer = configSchema.safeParse(process.env);

if (!configServer.success) {
    console.log("Các giá trị khai báo trong env không hợp lệ");
    console.error(configServer.error)
    process.exit(1);
}

const envConfig = configServer.data
export default envConfig