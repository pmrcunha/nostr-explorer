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
  return c.text("deleted");
});

export default app;
