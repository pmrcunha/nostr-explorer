import { Hono } from "hono";
import { cors } from "hono/cors";
import { openAPIRouteHandler } from "hono-openapi";
import queries from "./app/queries";
import relays from "./app/relays";
import { Cron, scheduledJobs } from "croner";
import { logger } from "hono/logger";
import { Scalar } from "@scalar/hono-api-reference";
import "dotenv/config";

const app = new Hono();
app.use(logger());
app.use(cors());

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

const activeJobs = scheduledJobs.map((job: Cron) => job.name);
console.log(`Registered Cron jobs: ${activeJobs}`);

const openapiSpec = openAPIRouteHandler(app, {
  documentation: {
    info: {
      title: "Nostr Explorer API",
      version: "1.0.0",
      description: `Documentation of the API`,
    },
    tags: [
      {
        name: "Queries",
        description: "Endpoints related to queries.",
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
});
app.get("/openapi", openapiSpec);
app.get(
  "/docs",
  Scalar({
    url: "/openapi",
    pageTitle: "Nostr Explorer API",
    theme: "default",
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("queries", queries);
app.route("relays", relays);

export default app;
