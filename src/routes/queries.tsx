import { createFileRoute } from '@tanstack/react-router'
import { QueriesPage } from '@/components/pages/queries'

export const Route = createFileRoute('/queries')({
  component: QueriesPage,
})

