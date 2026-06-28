import { createFileRoute } from '@tanstack/react-router';
import { IncidentsViews } from '@/features/incidents/views';
import { incidentSearchSchema } from '@/features/incidents/schemas/incident-search.schema';

export const Route = createFileRoute('/incidents')({
  validateSearch: incidentSearchSchema,
  component: IncidentsViews,
});
