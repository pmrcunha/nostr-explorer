export interface Event {
  kind: number;
  tags: string[][];
  content: string;
  created_at: number;
  pubkey: string;
  id: string;
  sig: string;
}
