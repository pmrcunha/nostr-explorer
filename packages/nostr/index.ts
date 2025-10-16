import { z } from "zod";

export function convertNpub(npub: string): string {
  return "pubkey" + npub;
}

export type NostrKindDescription = {
  kind: number;
  label: string;
  description?: string;
  nipUrl?: string;
};

export const kindDescriptions: NostrKindDescription[] = [
  {
    kind: 0,
    label: "Metadata",
  },
  {
    kind: 1,
    label: "Short Text Note",
    description: "A text note",
    nipUrl: "https://github.com/nostr-protocol/nips/blob/master/10.md",
  },
  {
    kind: 2,
    label: "Recommend Relay",
  },
  {
    kind: 3,
    label: "Contacts",
    description: "List of pubkeys the user follows",
  },
  {
    kind: 4,
    label: "Encrypted Direct Message",
    description: "Deprecated - do not use",
  },
  {
    kind: 5,
    label: "Event Deletion",
    description: "A request to delete one or more events",
  },
  {
    kind: 6,
    label: "Repost",
  },
  {
    kind: 7,
    label: "Reaction",
    description: "An emoji reaction to an event",
  },
  {
    kind: 64,
    label: "Chess PGN",
    nipUrl: "https://github.com/nostr-protocol/nips/blob/master/64.md",
  },
];

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

