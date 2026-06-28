import { z } from 'zod';
import { INCIDENT_TYPE_VALUES } from '@/shared/constants/domain';
import { INCIDENT_VIEW, INCIDENT_VIEW_VALUES } from '@/shared/constants/filters';

export const incidentSearchSchema = z.object({
  view: z
    .enum(INCIDENT_VIEW_VALUES)
    .optional()
    .catch(INCIDENT_VIEW.KANBAN),
  type: z.enum(INCIDENT_TYPE_VALUES).optional(),
  incidentId: z.string().optional(),
});

export type IncidentSearch = z.infer<typeof incidentSearchSchema>;
