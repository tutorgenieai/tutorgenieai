import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Remove dotenv config since Next.js automatically loads .env.local
// and the file system isn't available in middleware

// Make sure the environment variable is available
if (!process.env.NEXT_PUBLIC_DRIZZLE_DB_URL) {
  throw new Error("Database URL not found in environment variables");
}

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
export const db = drizzle(sql, { schema });
