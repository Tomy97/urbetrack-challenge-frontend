import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createIncidentSchema,
  type CreateIncidentInput,
} from '@/shared/schemas/incident.schema';
import { useZones } from './useZones';
import { createIncidents } from '@/shared/api/incidets.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { INCIDENT_TYPE } from '@/shared/constants/domain';

export const useReportIncidentDialog = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: zones = [] } = useZones();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateIncidentInput>({
    resolver: zodResolver(createIncidentSchema),
    defaultValues: {
      type: INCIDENT_TYPE.OVERFLOW,
      zoneId: '',
      lat: -34.5755,
      lng: -58.4338,
      description: '',
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createIncidents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.incidents() });
      toast.success('Incidente reportado correctamente');
      handleClose();
    },
    onError: () => {
      toast.error('No se pudo crear el incidente');
    },
  });

  const onSubmit = (data: CreateIncidentInput) => {
    mutate(data);
  };

  return {
    open,
    setOpen,
    zones,
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    handleOpen,
    handleClose,
    isPending,
  };
};
