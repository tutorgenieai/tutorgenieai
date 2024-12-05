import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.tsx",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};
