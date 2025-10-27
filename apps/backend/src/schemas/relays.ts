import { z } from "zod";

export const listRelaysResponse = z.object({
  relays: z.array(z.url()),
});

export type ListRelaysResponse = z.infer<typeof listRelaysResponse>;
