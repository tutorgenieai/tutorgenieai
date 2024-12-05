CREATE TYPE "public"."role" AS ENUM('user', 'system');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "aiOutput" (
	"id" serial PRIMARY KEY NOT NULL,
	"formData" varchar NOT NULL,
	"aiResponse" text,
	"templateSlug" varchar NOT NULL,
	"createdBy" varchar,
	"createdAt" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "role",
	"content" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"tutorId" uuid,
	"userId" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tutor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" varchar,
	"userName" varchar,
	"src" varchar,
	"name" text,
	"description" text,
	"instructions" text,
	"seed" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"categoryId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userSubscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar,
	"stripeCustomerId" varchar NOT NULL,
	"stripeSubscriptionId" varchar NOT NULL,
	"stripePriceId" varchar NOT NULL,
	"stripeCurrentPeriodEnd" timestamp,
	"stripeStatus" varchar NOT NULL,
	"plan" varchar,
	"credits" integer DEFAULT 10000
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_tutorId_tutor_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."tutor"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tutor" ADD CONSTRAINT "tutor_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tutor_idx" ON "message" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_idx" ON "tutor" USING btree ("categoryId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "tutor" USING btree ("name");