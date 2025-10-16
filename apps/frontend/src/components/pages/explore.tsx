import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useCallback, useState, type ChangeEvent } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  Code,
  Cog,
  ExternalLinkIcon,
  Eye,
  FolderGitIcon,
  PlusIcon,
} from "lucide-react";
import { ArrowUpRightIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useQuery } from "@tanstack/react-query";
import { searchEvents } from "@/api/meilisearch/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderGitIcon />
        </EmptyMedia>
        <EmptyTitle>No Events Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Query</Button>
          <Button variant="outline">Import Events</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
}

function LeftPanel() {
  const kinds = [
    {
      kind: 1,
      label: "Text Note",
      description: "A text note",
      nipUrl: "https://github.com/nostr-protocol/nips/blob/master/10.md",
    },
    {
      kind: 3,
      label: "Follows List",
      description: "List of pubkeys the user follows",
    },
    {
      kind: 5,
      label: "Delete Request",
      description: "A request to delete one or more events",
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
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2>Nostr Explorer</h2>
        <h3>Kinds</h3>
        <div className="flex w-full max-w-lg flex-col gap-3">
          {kinds.map((kind) => {
            return (
              <Item key={kind.kind} className="flex items-center group">
                <ItemMedia>
                  <Checkbox id={String(kind.kind)} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    <Label
                      htmlFor={String(kind.kind)}
                    >{`#${kind.kind} ${kind.label}`}</Label>
                  </ItemTitle>
                  <ItemDescription>
                    {kind.description ?? "Read the NIP"}
                  </ItemDescription>
                </ItemContent>
                {kind.nipUrl && (
                  <ItemActions>
                    <a
                      href={kind.nipUrl}
                      target="_blank"
                      rel="noorigin noreferrer"
                    >
                      <ExternalLinkIcon className="size-4 stroke-gray-300 group-hover:stroke-gray-700" />
                    </a>
                  </ItemActions>
                )}
              </Item>
            );
          })}
        </div>
      </div>
      <Button variant="outline">
        <Cog /> Settings
      </Button>
    </div>
  );
}

type SearchInputProps = {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};
function SearchInput({ onSearch }: SearchInputProps) {
  return <Input onChange={onSearch} />;
}

function SortSelect() {
  return (
    <div className="flex gap-2">
      <Label>Sort</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sorting method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Date</SelectItem>
          <SelectItem value="kind">Kind</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchQuery = useQuery({
    queryKey: ["search-events", searchTerm],
    queryFn: () => searchEvents(searchTerm),
    staleTime: 2,
  });
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  const [view, setView] = useState<"raw" | "preview">("preview");

  const results = searchQuery.data ?? [];
  return (
    <div className="h-[80vh] overflow-y-scroll">
      <div className="flex justify-between items-center p-3 gap-3">
        <SearchInput onSearch={handleSearch} />
        <div className="flex items-center gap-3">
          <SortSelect />
          <div className="flex gap-2">
            <Button
              onClick={() => setView("preview")}
              size="icon"
              variant="outline"
            >
              <Eye />
            </Button>
            <Button
              onClick={() => setView("raw")}
              size="icon"
              variant="outline"
            >
              <Code />
            </Button>
          </div>
        </div>
      </div>
      {searchQuery.isLoading && <div>Thinking...</div>}
      {searchQuery.isError && (
        <div>{JSON.stringify(searchQuery.error, null, 2)}</div>
      )}
      {searchQuery.isSuccess && (
        <div className="flex flex-col gap-3 p-3">
          {results.length > 0 ? (
            results.map((result, i) => {
              return (
                <Card key={i} className="w-full">
                  <CardHeader>
                    <CardTitle>Kind 1</CardTitle>
                    <CardDescription>Text Note</CardDescription>
                    <CardAction className="flex gap-2"></CardAction>
                  </CardHeader>
                  <CardContent>
                    {view === "raw" ? (
                      <pre className="text-wrap overflow-x-scroll">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    ) : (
                      <div>{result.content}</div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div>
              <EmptyDemo />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RightPanel() {
  const relays = [
    {
      name: "Damus",
      url: "wss://relay.damus.io",
      avatarSrc: "https://damus.io/logo_icon_2.png",
    },
    {
      name: "NOS",
      url: "wss://relay.nos.lol",
    },
  ];
  return (
    <div className="">
      <h3>Relays</h3>

      <div className="flex w-full max-w-lg flex-col gap-6">
        {relays.map((relay) => {
          return (
            <Item key={relay.url} variant="outline">
              <ItemMedia>
                <Avatar className="size-10 border-1 border-gray-200">
                  <AvatarImage src={relay.avatarSrc} />
                  <AvatarFallback>
                    {relay.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{relay.name}</ItemTitle>
                <ItemDescription>{relay.url}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  size="icon-sm"
                  variant="outline"
                  className="rounded-full"
                  aria-label="Invite"
                >
                  <PlusIcon />
                </Button>
              </ItemActions>
            </Item>
          );
        })}
      </div>
      <div>
        <div>
          <h3>Npubs</h3>
        </div>
      </div>
    </div>
  );
}

export function ExplorePage() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="m-8 p-3 rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={20}>
        <LeftPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <div className="p-6">
          <span className="font-semibold">
            <Main />
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={30}>
        <div className=" p-6">
          <span className="font-semibold">
            <RightPanel />
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
