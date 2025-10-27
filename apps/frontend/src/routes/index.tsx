import { createFileRoute } from "@tanstack/react-router";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { KindsPanel } from '@/components/features/kinds-panel/kinds-panel'
import { FiltersPanel } from '@/components/features/filters-panel/filters-panel'
import { SearchPanel } from "@/components/features/search-panel/search-panel";

export const Route = createFileRoute("/")({
  component: ExplorePage,
});

export function ExplorePage() {
  return (
    <div className="grid grid-cols-[300px_1fr] h-full">
      <KindsPanel />
      <ResizablePanelGroup
        direction="horizontal"
        className="md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={60}>
          <SearchPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <FiltersPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
