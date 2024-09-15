import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: serial('id').primaryKey(),
    clerkUserId: text('clerk_user_id').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
}); 



export type User = typeof user.$inferSelect; 