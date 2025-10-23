import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components//ui/avatar";
import { Button } from '@/components/ui/button'
import { PlusIcon } from "lucide-react";

export function FiltersPanel() {
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
        <div className="p-6">
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
