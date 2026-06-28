import { z } from 'zod';
import { INCIDENT_TYPE_VALUES } from '@/shared/constants/domain';
import { MAP_LAYER, MAP_LAYER_VALUES } from '@/shared/constants/filters';

export const mapSearchSchema = z.object({
  incidentId: z.string().optional(),
  layer: z.enum(MAP_LAYER_VALUES).optional().catch(MAP_LAYER.BOTH),
  activeOnly: z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .optional()
    .transform((value) => value !== 'false' && value !== false)
    .catch(true),
  type: z.enum(INCIDENT_TYPE_VALUES).optional(),
});

export type MapSearch = z.infer<typeof mapSearchSchema>;
