import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

const queries = [
  {
    id: 1,
    name: "Fetch all events from my npub"
  }
]


export function QueriesPage() {
  return <div className="grid grid-cols-[300px_1fr] h-full">
    <nav className="flex flex-col gap-3">
      <div>Queries</div>
    </nav>
    <div>
      <div>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline">Add Query</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Query</DialogTitle>
                <DialogDescription>
                  Create a new query to be executed on a schedule
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="label">Label</Label>
                  <Input id="label" name="label" defaultValue="Save all events from my npub" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input id="schedule" name="schedule" defaultValue="* * * * *" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="relay">Relay</Label>
                  <Input id="relay" name="relay" defaultValue="wss://relay.damus.io" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="filter">Filter</Label>
                  <Input id="filter" name="filter" defaultValue="authors: npub1xxx" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Query</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      {queries.map(query => <div key={query.id}>{query.name}</div>)}
    </div>
  </div>
    ;
}
