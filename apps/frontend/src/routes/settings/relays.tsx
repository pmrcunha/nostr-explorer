import { BASE_URL } from '@/api/constants'
import { listRelays } from '@/api/relays/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/relays')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, error, isError } = useQuery({
    queryKey: ['relays'],
    queryFn: listRelays
  })

  const relays = data?.relays || [];

  const addRelayMutation = useMutation({
    mutationFn: async (newRelay: string) => {
      const response = await fetch(`${BASE_URL}/relays`, {
        method: 'POST',
        body: newRelay
      })
      return response.json()
    }
  })

  if (isError) console.error(error)

  return <div className="p-4">
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const newRelay = e.currentTarget.relay.value
      addRelayMutation.mutate(newRelay)
    }}>
      <div className="grid gap-3">
        <Label htmlFor="relay">Add relay</Label>
        <div className="flex gap-2"><Input id="relay" name="relay" /><Button>Submit</Button></div>
      </div>
    </form>

    <ul>{relays.map((relay: { id: number; url: string }) => <li key={relay.id}>{relay.url}</li>)}</ul>


  </div>
}
