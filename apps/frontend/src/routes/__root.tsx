import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CogIcon } from "lucide-react";

const RootLayout = () => (
  <div className="grid grid-rows-[48px_1fr] h-screen overflow-hidden">
    <div className="px-4 py-3 flex gap-2 justify-between items-center border-b-1 border-b-slate-200">
      <Link to="/"><h2>Nostr Explorer</h2></Link>
      <Link to="/settings/queries" className="group flex items-center justify-center bg-slate-100 rounded-md [&.active]:bg-slate-200 hover:bg-slate-200 size-8">
        <CogIcon className="size-6 stroke-slate-500 group-hover:stroke-slate-700" />
      </Link>
    </div>
    <div className="h-full min-h-0">
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
