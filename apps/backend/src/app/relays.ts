import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
// import { resolver } from "hono-openapi/zod";
import { db } from "../db";
import { relays } from "../db/schema";

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

export default app;
