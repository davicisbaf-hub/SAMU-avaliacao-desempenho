import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  // Frontend
  jwtSecret: string;
  port: number;
  viteApiUrl: string;
  nodeEnv: string;

  // Backend
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
    schema: string;
  };
}

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || defaultValue || "";
};

export const env: EnvConfig = {
  // Frontend
  jwtSecret: getEnv("JWT_SECRET"),
  port: Number(getEnv("PORT", "http://localhost:3001")),
  viteApiUrl: getEnv("VITE_API_URL"),
  nodeEnv: getEnv("nodeEnv", "development"),
  // Backend
  db: {
    host: getEnv("DB_HOST"),
    port: Number(getEnv("DB_PORT")),
    user: getEnv("DB_USER"),
    password: getEnv("DB_PASSWORD"),
    name: getEnv("DB_NAME"),
    schema: getEnv("DB_SCHEMA"),
  },
};