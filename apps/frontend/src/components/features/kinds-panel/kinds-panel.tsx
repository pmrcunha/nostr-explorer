import { kindDescriptions } from "@pmrcunha/nostr"
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import {
    ExternalLinkIcon,
} from "lucide-react";

export function KindsPanel() {
    return (
        <div className="border-r p-4 flex flex-1 flex-col overflow-y-auto">
            <h3 className="text-md font-medium">Kinds</h3>
            <div className="flex-1 overflow-y-auto flex w-full max-w-lg flex-col gap-3">
                {kindDescriptions.map((kind) => {
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
    );
}
