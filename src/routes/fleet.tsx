import { createFileRoute } from '@tanstack/react-router'
import { FleetView } from '@/features/fleet/views'

export const Route = createFileRoute('/fleet')({
  component: FleetView,
})
