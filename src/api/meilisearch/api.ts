import {
  searchEventsResponseSchema,
  searchEventsBodySchema,
  type SearchEventsResponse,
} from "./schema";

export async function searchEvents(
  query: string,
): Promise<SearchEventsResponse["hits"]> {
  const body = {
    q: query,
  };
  const validBody = searchEventsBodySchema.safeParse(body);
  if (!validBody.success) throw Error("Invalid payload for search endpoint");
  const response = await fetch("http://localhost:7700/indexes/events/search", {
    method: "POST",
    body: JSON.stringify(validBody.data),
    headers: {
      Authorization: `Bearer meilisearch_token`,
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  const validResponse = searchEventsResponseSchema.safeParse(json);
  if (!validResponse.success) {
    throw Error("Unexpected response from search endpoint");
  }
  return validResponse.data.hits;
}
