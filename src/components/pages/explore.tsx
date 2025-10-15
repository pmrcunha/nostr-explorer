import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '../ui/input'
import { useCallback } from 'react'

function LeftPanel() {
    return <div>
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
}

function SearchInput() {
    const handleSearch = useCallback((e: React.ChangeEvent) => {
        fetch('http://localhost:7700/indexes/events/search', {
            method: 'POST',
            body: JSON.stringify({
                q: e.target.value
            }),
            headers: {
                Authorization: `Bearer meilisearch_token`,
                "Content-Type": "application/json"
            }
        })
    }, [])
    return <Input onChange={handleSearch} />
}

function SortSelect() {
    return <span><Label>Sort</Label></span>
}

function Main() {
    return <div>
        <div>
            <SearchInput />
            <SortSelect />
        </div>
        <div>
            {Array.from({ length: 15 }).fill(null).map((_, i) => {
                return <div key={i}>
                    <span>1</span>
                    <pre>
                        {`
{
    "kind": 1,
    "id": "6bcf541ec8e8a3d734906a6fa5ac97c15bc4aded367b7f598cab6d3bf13fb422",
    "pubkey": "b299876ba85e33da57269247f7f91aee025f5bd2bc229aa85c7908f37c10c838",
    "created_at": 1681168055,
    "tags": [
      [
        "client",
        "coracle"
      ]
    ],
    "content": "Still fighting connection issues, but excited about Nostr!",
    "sig": "e12e35319525d1a99d1e9830c5087ad3493ad631db82ea2a55edff9146b8e2a7288697c0a12ff96617c940f2696417542aa2284149ced7238c2fafa2f4e37ec3"
  }
`}
                    </pre>
                </div>
            })}
        </div>
    </div>
}

function RightPanel() {
    return <div className="flex flex-col items-center gap-3">
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
    return <>
        <LeftPanel />
        <Main />
        <RightPanel />
    </>
}
