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
  DB_URI: process.env.DB_URI
};

export default config;
