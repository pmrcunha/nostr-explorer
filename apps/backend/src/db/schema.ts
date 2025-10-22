import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const queries = sqliteTable("queries", {
  id: int().primaryKey({ autoIncrement: true }),
  label: text().notNull(),
  schedule: text().notNull(),
  filter: text().notNull(),
});

export const queriesRelations = relations(queries, ({ many }) => ({
  queriesToRelays: many(queriesToRelays),
}));

export const relays = sqliteTable("relays", {
  id: int().primaryKey({ autoIncrement: true }),
  url: text().notNull().unique(),
  label: text(),
});

export const relaysRelations = relations(relays, ({ many }) => ({
  queriesToRelays: many(queriesToRelays),
}));

export const queriesToRelays = sqliteTable(
  "queries_to_relays",
  () => ({
    relayId: int("relay_id")
      .notNull()
      .references(() => relays.id),
    queryId: int("query_id")
      .notNull()
      .references(() => queries.id),
  }),
  (t) => [primaryKey({ columns: [t.relayId, t.queryId] })],
);

export const queriesToRelaysRelations = relations(
  queriesToRelays,
  ({ one }) => ({
    queries: one(queries, {
      fields: [queriesToRelays.queryId],
      references: [queries.id],
    }),
    relays: one(relays, {
      fields: [queriesToRelays.relayId],
      references: [relays.id],
    }),
  }),
);
