import { integer, pgTable, serial, text, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

export const profileInfo = pgTable('profileInfo', {
  id: serial('id').primaryKey(),
  metadata: jsonb('metadata'),
  userId: integer('userId').references(() => users.id),
});
