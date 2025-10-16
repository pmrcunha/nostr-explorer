import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    queries: [
      {
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
});

export default app;
