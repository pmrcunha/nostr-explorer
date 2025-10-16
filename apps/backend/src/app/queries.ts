import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
// import { resolver } from "hono-openapi/zod";

const app = new Hono();

// list queries
app.get(
  "/",
  describeRoute({
    summary: "List queries",
    description: "List all the nostr queries the server is performing",
    tags: ["Queries"],
    responses: {
      200: {
        description: "Account created successfully.",
        // content: {
        //   "application/json": {
        //     schema: resolver(readAccountResponseSchema),
        //   },
        // },
      },
      // 400: {
      //   description: "Invalid registration data or email already exists.",
      // },
      // 422: {
      //   description: "Validation errors in the provided data.",
      // },
    },
  }),
  (c) => {
    return c.json({
      queries: [
        {
          id: 1,
          schedule: "* * * * *", // every minute, cron syntax
          relays: ["wss://relay.damus.io", "wss://relay.nos.lol"],
          filters: [
            {
              kind: [1],
              authors: [
                "b299876ba85e33da57269247f7f91aee025f5bd2bc229aa85c7908f37c10c838",
              ],
            }, // get kind 1 notes authored by me
          ],
        },
      ],
    });
  },
);

// read query
app.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.json({
    id,
    schedule: "* * * * *", // every minute, cron syntax
    filters: [
      {
        kind: [1],
        authors: [
          "b299876ba85e33da57269247f7f91aee025f5bd2bc229aa85c7908f37c10c838",
        ],
      }, // get kind 1 notes authored by me
    ],
  });
});

// create a query
app.post("/", (c) => {
  // read relays from payload
  // get relay information from nostr
  // store relay information in relays table
  // create cron job according to the query
  // in the cron job, fetch data from the relays, then push it to meilisearch
  // store all query information in the queries table, including the name of the cron job

  return c.json({
    id: 2,
    schedule: "* * * * *", // every minute, cron syntax
    filters: [
      {
        kind: [1],
        authors: [
          "b299876ba85e33da57269247f7f91aee025f5bd2bc229aa85c7908f37c10c838",
        ],
      }, // get kind 1 notes authored by me
    ],
  });
});

// update query
app.put("/:id", (c) => {
  const id = c.req.param("id");
  // get the query from the queries database
  // stop the cron job with the name in the record
  // create a new cron job, with the new query
  // update the record in the queries table
  return c.json({
    id,
    schedule: "* * * * *", // every minute, cron syntax
    filters: [
      {
        kind: [1],
        authors: [
          "b299876ba85e33da57269247f7f91aee025f5bd2bc229aa85c7908f37c10c838",
        ],
      }, // get kind 1 notes authored by me
    ],
  });
});

// delete query
app.delete("/:id", (c) => {
  // get the query from the queries table
  // stop the cron job with the name in the record
  // delete the record from the database
  return c.text("deleted");
});

// Placeholder to create relay connections
app.get("/connect", async (c) => {
  const ws = new WebSocket("wss://relay.damus.io");

  ws.onopen = () => {
    console.log("Connected");
    ws.send("Hello from Hono!");
  };

  ws.onmessage = (event) => {
    console.log("Received:", event.data);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("Disconnected");
  };

  return c.text("WebSocket connection initiated");
});

export default app;
