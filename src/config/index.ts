import dotenv from "dotenv";
import { env } from "process";
dotenv.config({ quiet: true });
export const config = {
  port: env.PORT,
  database_url: env.DATABASE_URL as string,
  refresh: env.REFRESH as string,
  access: env.ACCESS as string,
};
