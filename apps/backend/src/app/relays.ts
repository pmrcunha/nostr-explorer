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
