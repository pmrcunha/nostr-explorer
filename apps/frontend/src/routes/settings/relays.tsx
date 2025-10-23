import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/relays')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/relays"!</div>
}
