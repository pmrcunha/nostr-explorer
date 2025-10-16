import { z } from "zod";
import { NostrEventSchema } from "@/lib/nostr/types";

export const searchEventsBodySchema = z.object({
  q: z.string(),
});

export const searchEventsResponseSchema = z.object({
  hits: z.array(NostrEventSchema),
  query: z.string(),
  processingTimeMs: z.number(),
  limit: z.number(),
  offset: z.number(),
  estimatedTotalHits: z.number(),
});

export type SearchEventsResponse = z.infer<typeof searchEventsResponseSchema>;
