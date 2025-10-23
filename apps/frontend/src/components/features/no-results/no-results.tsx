import { ArrowUpRightIcon } from "lucide-react";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import {
    FolderGitIcon,
} from "lucide-react";

export function NoResults() {
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
