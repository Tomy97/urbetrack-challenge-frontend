import { createFileRoute } from '@tanstack/react-router'
import { MapViews } from '@/features/map/views'

export const Route = createFileRoute('/map')({
  component: MapViews,
})