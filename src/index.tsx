import { serve } from "bun";
import index from "./index.html";

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
