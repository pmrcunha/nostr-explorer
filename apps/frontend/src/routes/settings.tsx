import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="grid grid-cols-[300px_1fr] h-full">
    <nav className="flex flex-col gap-3 border-r border-r-slate-200 p-4">
      <Link to="/settings/queries">Queries</Link>
      <Link to="/settings/relays">Relays</Link>
    </nav>
    <Outlet />
  </div>
}
