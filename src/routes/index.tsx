import { createFileRoute } from '@tanstack/react-router'
import { ExplorePage } from '@/components/pages/explore'

export const Route = createFileRoute('/')({
  component: ExplorePage,
})

