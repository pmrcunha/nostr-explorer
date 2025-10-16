import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    relays: [
      {
        url: "wss://relay.damus.io",
      },
      {
        url: "wss://relay.nos.lol",
      },
    ],
  });
});

export default app;
