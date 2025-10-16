import { Hono } from "hono";
import queries from "./app/queries";
import relays from "./app/relays";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("queries", queries);
app.route("relays", relays);

export default app;
