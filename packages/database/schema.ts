import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const page = pgTable('Page', {
  id: serial().primaryKey().notNull(),
  name: text().notNull(),
});
