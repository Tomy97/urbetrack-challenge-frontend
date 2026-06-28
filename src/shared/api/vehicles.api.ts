import axios from 'axios';
import type { Vehicle } from '@/shared/types/vehicle';
import type { VehicleFilters } from '@/shared/lib/queryKeys';

const API_URL = `${import.meta.env.VITE_API_URL}/vehicles`;

export const getVehicles = async (
  filters?: VehicleFilters,
): Promise<Vehicle[]> => {
  const params: Record<string, string> = {};
  if (filters?.status) params.status = filters.status;
  if (filters?.type) params.type = filters.type;

  const { data } = await axios.get<Vehicle[]>(API_URL, { params });
  return data;
};
