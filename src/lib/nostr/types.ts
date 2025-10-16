import { z } from "zod";

export const NostrEventSchema = z.object({
  id: z.string(),
  kind: z.number(),
  pubkey: z.string(),
  created_at: z.number(),
  tags: z.array(z.array(z.string())),
  content: z.string(),
  sig: z.string(),
});

export type NostrEvent = z.infer<typeof NostrEventSchema>;
