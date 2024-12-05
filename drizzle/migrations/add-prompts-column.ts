import { sql } from "drizzle-orm";

export const addPromptsColumn = sql`
  ALTER TABLE "userSubscription"
  ADD COLUMN IF NOT EXISTS "prompts" integer DEFAULT 1;
  
  -- Update existing monthly subscriptions to have unlimited prompts (using max integer)
  UPDATE "userSubscription"
  SET "prompts" = 2147483647
  WHERE "plan" = 'monthly' AND "stripeStatus" = 'active';
`;
