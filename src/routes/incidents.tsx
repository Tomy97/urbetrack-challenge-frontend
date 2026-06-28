import { createFileRoute } from '@tanstack/react-router'
import { IncidentsViews } from '@/features/incidents/views'

export const Route = createFileRoute('/incidents')({
  component: IncidentsViews,
})
