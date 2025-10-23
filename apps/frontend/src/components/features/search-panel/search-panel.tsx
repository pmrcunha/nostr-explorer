import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback, useState, type ChangeEvent } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Code,
    Eye,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchEvents } from "@/api/meilisearch/api";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { NoResults } from '@/components/features/no-results/no-results'

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

export function SearchPanel() {
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
        <div className="p-6 h-full">
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
                <div className="h-full flex-1 overflow-y-auto flex flex-col gap-3 p-3">
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
                            <NoResults />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
