CREATE TYPE "job_status" AS ENUM('new', 'reviewing', 'matched', 'closed');--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"trade_category" text NOT NULL,
	"customer_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"postcode" text,
	"area" text,
	"timing" text,
	"description" text,
	"status" "job_status" DEFAULT 'new'::"job_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "jobs_status_idx" ON "jobs" ("status");--> statement-breakpoint
CREATE INDEX "jobs_trade_category_idx" ON "jobs" ("trade_category");--> statement-breakpoint
CREATE INDEX "jobs_created_at_idx" ON "jobs" ("created_at");