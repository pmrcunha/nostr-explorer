export async function searchEvents(query: string) {
  const response = await fetch("http://localhost:7700/indexes/events/search", {
    method: "POST",
    body: JSON.stringify({
      q: query,
    }),
    headers: {
      Authorization: `Bearer meilisearch_token`,
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json.hits;
}
