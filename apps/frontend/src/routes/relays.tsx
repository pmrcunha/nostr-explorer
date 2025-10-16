import { createFileRoute } from "@tanstack/react-router";
import { RelaysPage } from "@/components/pages/relays";

export const Route = createFileRoute("/relays")({
  component: RelaysPage,
});
