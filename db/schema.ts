import { index, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Lifecycle of a customer job enquiry as it moves through triage.
 * new -> reviewing -> matched -> closed
 */
export const jobStatus = pgEnum("job_status", [
  "new",
  "reviewing",
  "matched",
  "closed",
]);

export const jobs = pgTable(
  "jobs",
  {
    id: serial().primaryKey(),
    title: text().notNull(),
    tradeCategory: text("trade_category").notNull(),
    customerName: text("customer_name").notNull(),
    phone: text().notNull(),
    email: text(),
    postcode: text(),
    area: text(),
    timing: text(),
    description: text(),
    status: jobStatus().notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("jobs_status_idx").on(table.status),
    index("jobs_trade_category_idx").on(table.tradeCategory),
    index("jobs_created_at_idx").on(table.createdAt),
  ],
);
