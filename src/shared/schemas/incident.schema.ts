import { z } from 'zod';

export const createIncidentSchema = z.object({
  type: z.enum(['OVERFLOW', 'DAMAGE', 'LITTERING', 'OTHER']),
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
