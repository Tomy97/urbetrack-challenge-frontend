import { z } from 'zod';
import { INCIDENT_TYPE_VALUES } from '@/shared/constants/domain';

export const createIncidentSchema = z.object({
  type: z.enum(INCIDENT_TYPE_VALUES),
  description: z
    .string()
    .min(1, 'La descripción es obligatoria.')
    .min(6, 'Mínimo 6 caracteres.'),
  zoneId: z.string().min(1, 'Seleccioná una zona.'),
  lat: z.number().min(-90, 'Latitud inválida.').max(90, 'Latitud inválida.'),
  lng: z
    .number()
    .min(-180, 'Longitud inválida.')
    .max(180, 'Longitud inválida.'),
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;
