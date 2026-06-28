import { createFileRoute } from '@tanstack/react-router';
import { MapViews } from '@/features/map/views';
import { mapSearchSchema } from '@/features/map/schemas/map-search.schema';

export const Route = createFileRoute('/map')({
  validateSearch: mapSearchSchema,
  component: MapViews,
});
