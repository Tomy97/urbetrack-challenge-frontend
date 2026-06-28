import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createIncidentSchema,
  type CreateIncidentInput,
} from '@/shared/schemas/incident.schema';
import { useZones } from './useZones';
import { useMutation } from '@tanstack/react-query';
import { createIncidents } from '@/shared/api/incidets.api';

export const useReportIncidentDialog = () => {
  const [open, setOpen] = useState(false);
  const { data } = useZones();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateIncidentInput>({
    resolver: zodResolver(createIncidentSchema),
    defaultValues: {
      type: '',
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
  const { mutate } = useMutation({
    mutationKey: ['incident'],
    mutationFn: createIncidents,
    onSuccess: () => {
      handleClose();
    },
  });

  const onSubmit = (data: CreateIncidentInput) => {
    mutate(data);
  };

  return {
    open,
    setOpen,
    zones: data,
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    handleOpen,
    handleClose,
  };
};
