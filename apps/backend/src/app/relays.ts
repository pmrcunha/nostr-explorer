import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
// import { resolver } from "hono-openapi/zod";
import { db } from "../db";
import { relays } from "../db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

app.get(
  "/",
  describeRoute({
    summary: "List relays",
    description: "Lists all relays added by the user",
    tags: ["Relays"],
    responses: {
      200: {
        description: "Relays listed successfully",
      },
    },
  }),
  async (c) => {
    const result = await db.select().from(relays);
    console.log(result);
    return c.json({
      relays: result,
    });
  },
);

app.post(
  "/",
  describeRoute({
    summary: "Create relay",
    description: "Adds a relay to the database",
    tags: ["Relays"],
  }),
  async (c) => {
    const relay = await c.req.text();
    const result = await db.insert(relays).values({ url: relay, label: "" });
    return c.json({ success: true, result });
  },
);

app.delete(
  "/:id",
  describeRoute({
    summary: "Delete a relay",
    description: "Deletes a relay from the database",
    tags: ["Relays"],
  }),
  async (c) => {
    const relayId = parseInt(c.req.param("id"));
    const result = await db.delete(relays).where(eq(relays.id, relayId));
    return c.json({ success: true, result });
  },
);

export default app;
