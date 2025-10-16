import queries from "./app/queries";
import relays from "./app/relays";
import { Cron, scheduledJobs } from "croner";
import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { Scalar } from "@scalar/hono-api-reference";

import { convertNpub } from "@pmrcunha/nostr";

console.log(convertNpub("bum"));

const app = new OpenAPIHono();
app.use(logger());

const job = new Cron(
  "*/5 * * * * *",
  { name: "five-seconds-test", timezone: "Europe/Copenhagen" },
  () => {
    console.log("5 seconds have passed");
  },
);
console.log(
  `Cron job ${job.name}: ${job.isRunning() ? "running" : "not running"}`,
);

console.log(`Registered Cron jobs: ${scheduledJobs.map((job) => job.name)}`);

app.doc("/doc", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/scalar", Scalar({ url: "/doc" }));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("queries", queries);
app.route("relays", relays);

export default app;
