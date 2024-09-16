import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: serial('id').primaryKey(),
    clerkUserId: text('clerk_user_id').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
}); 

export const files = pgTable("files", {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => user.id).notNull(),
    url: text('url').notNull(),
    name: text('name').notNull(),
    key: text('key').notNull(),
    size: integer('size').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const images = pgTable("images", {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => user.id).notNull(),
    url: text('url').notNull(),
    name: text('name').notNull(),
    key: text('key').notNull(),
    size: integer('size').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const notes = pgTable("notes", {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => user.id).notNull(),
    note: text('note').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});


export type User = typeof user.$inferSelect;
export type File = typeof files.$inferSelect;
export type Image = typeof images.$inferSelect;
export type Note = typeof notes.$inferSelect;