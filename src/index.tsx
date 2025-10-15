import { serve } from "bun";
import index from "./index.html";

import {
  Schedule,
  Cron,
  DateTime,
  Console
} from "effect"
import { log } from "./lib/utils";

// every 10 seconds
const cron = Cron.make({
  seconds: [5, 10, 15, 30, 35, 45, 55], // Trigger at the start of a minute
  minutes: [], // Trigger at the start of an hour
  hours: [], // Trigger at 4:00 AM
  days: [], // Specific days of the month
  months: [], // No restrictions on the month
  weekdays: [], // No restrictions on the weekday
  tz: DateTime.zoneUnsafeMakeNamed("Europe/Copenhagen") // Optional time zone
})

// const nextDate = Cron.sequence(cron, new Date())

// console.log(nextDate.next().value)


const schedule = Schedule.cron(cron);


const action = Console.log('Here we are again')
log(action, schedule);

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/search/:q": async (req) => {
      const query = req.params.q;

      const response = await fetch("http://localhost:7700");
      const json = await response.json()
      console.log(json)

      return Response.json({
        description: "Query Meilisearch. Filters adjust the query.",
        method: "GET",
        search_term: query
      });
    },
    "/api/queries": {
      async POST() {
        return Response.json({
          description: "Sets the queries that the cron job should run, and the schedule. Will have all CRUD operations",
          method: "POST",
        });
      },
    },
    "/api/relays": {
      async PUT() {
        return Response.json({
          description: "Update the list of relays to query",
          method: "PUT",
        });
      }
    }
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
