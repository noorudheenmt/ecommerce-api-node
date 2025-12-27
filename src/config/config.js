import dotenv from "dotenv";
import path from "path";

// Determine current environment (default = development)
const env = process.env.NODE_ENV || "development";
const envFile = `.env.${env}`;

// Load .env file from env folder
dotenv.config({
  path: path.resolve(process.cwd(), "env", envFile),
  quiet: true
});

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DB_URI: process.env.DB_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};

export default config;
