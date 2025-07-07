import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string(),
  DB_URL: z.string().url(),
  ISSUER: z.string(),
  SECURITY_KEY: z.string().min(32),
  EXPIRATION_TIME: z.string(),
});

const env = envSchema.safeParse(process.env);
if (!env.success) {
  console.error("Error en la configuración del entorno:", env.error.format());
  process.exit(1);
}

export const config = {
  PORT: env.data.PORT,
  DB_URL: env.data.DB_URL,
  ISSUER: env.data.ISSUER,
  SECURITY_KEY: env.data.SECURITY_KEY,
  EXPIRATION_TIME: env.data.EXPIRATION_TIME,
};
