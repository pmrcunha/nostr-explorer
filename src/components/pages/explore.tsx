import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '../ui/input'
import { useCallback, useState, type ChangeEvent } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button'
import { Code, Cog, Eye, FolderGitIcon } from 'lucide-react'
import type { Event } from '@/lib/nostr/types'
import { ArrowUpRightIcon } from "lucide-react"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

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
    )
}


function LeftPanel() {
    return <div className="flex flex-col justify-between h-full">
        <div>
            <h2>Nostr Explorer</h2>
            <h3>Kinds</h3>
            <ul>
                <li className="flex items-center gap-3">
                    <Checkbox id="kind1" />
                    <Label htmlFor="kind1">#1 Note</Label>
                </li>
                <li className="flex items-center gap-3">
                    <Checkbox id="kind3" />
                    <Label htmlFor="kind3">#3 Follows</Label>
                </li>
                <li className="flex items-center gap-3">
                    <Checkbox id="kind5" />
                    <Label htmlFor="kind5">#5 Delete Requests</Label>
                </li>
                <li className="flex items-center gap-3">
                    <Checkbox id="kind7" />
                    <Label htmlFor="kind7">#7 Reactions</Label>
                </li>
            </ul>
        </div>
        <Button variant="outline"><Cog /> Settings</Button>
    </div>
}


type SearchInputProps = {
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}
function SearchInput({ onSearch }: SearchInputProps) {

    return <Input onChange={onSearch} />
}

function SortSelect() {
    return <span><Label>Sort</Label></span>
}

type MainProps = {
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    results: Event[];
}

function Main({ onSearch, results }: MainProps) {
    const [view, setView] = useState<'raw' | 'preview'>('preview')
    return <div className="h-[90vh] overflow-y-scroll">
        <div>
            <SearchInput onSearch={onSearch} />
            <SortSelect />
        </div>
        <div className="flex flex-col gap-3 p-3">
            {results.length > 0 ? results.map((result, i) => {
                return <Card key={i} className="w-full">
                    <CardHeader>
                        <CardTitle>Kind 1</CardTitle>
                        <CardDescription>Text Note</CardDescription>
                        <CardAction className="flex gap-2">
                            <Button onClick={() => setView('preview')} size="icon" variant="outline"><Eye /></Button>
                            <Button onClick={() => setView('raw')} size="icon" variant="outline"><Code /></Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        {view === 'raw' ? <pre className="text-wrap overflow-x-scroll">{JSON.stringify(result, null, 2)}</pre> : <div>{result.content}</div>}
                    </CardContent>
                </Card>
            }) : <div><EmptyDemo /></div>}
        </div>
    </div>
}

function RightPanel() {
    return <div className="">
        <h3>Relays</h3>
        <div className="flex items-center gap-3">
            <Checkbox id="damus" />
            <Label htmlFor="damus">wss://relay.damus.io</Label>
        </div>
        <div className="flex items-center gap-3">
            <Checkbox id="nos" />
            <Label htmlFor="nos">wss://relay.nos.lol</Label>
        </div>
        <div>
            <div>

                <h3>Npubs</h3>
            </div>
        </div>
    </div>
}

export function ExplorePage() {
    const [events, setEvents] = useState([])
    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        fetch('http://localhost:7700/indexes/events/search', {
            method: 'POST',
            body: JSON.stringify({
                q: e.currentTarget.value
            }),
            headers: {
                Authorization: `Bearer 83e829e576b979e007e7e12487bd3cc18eece56ba0f09a00550ccfd420298173`,
                "Content-Type": "application/json"
            }
        }).then(rsp => rsp.json()).then(json => {
            console.log(json);
            setEvents(json.hits)
        })
    }, [])
    return <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border md:min-w-[450px]"
    >
        <ResizablePanel defaultSize={20}>
            <LeftPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
            <div className="p-6">
                <span className="font-semibold"><Main results={events} onSearch={handleSearch} /></span>
            </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20}>
            <div className=" p-6">
                <span className="font-semibold"><RightPanel /></span>
            </div>
        </ResizablePanel>
    </ResizablePanelGroup>
}


