import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const queries = sqliteTable("queries", {
  id: int().primaryKey({ autoIncrement: true }),
  label: text().notNull(),
  schedule: text().notNull(),
  filter: text().notNull(),
  relayId: int(),
});

export const queriesRelations = relations(queries, ({ one }) => ({
  relay: one(relays, {
    fields: [queries.relayId],
    references: [relays.id],
  }),
}));

export const relays = sqliteTable("relays", {
  id: int().primaryKey({ autoIncrement: true }),
  url: text().notNull().unique(),
  label: text(),
});

export const relaysRelations = relations(relays, ({ many }) => ({
  queries: many(queries),
}));
