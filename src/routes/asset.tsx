import { createFileRoute } from '@tanstack/react-router'
import { AssetsView } from '@/features/assets/views'

export const Route = createFileRoute('/asset')({
  component: AssetsView,
})
