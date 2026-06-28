import { useQuery } from '@tanstack/react-query';
import { getVehicles } from '@/shared/api/vehicles.api';
import { queryKeys, type VehicleFilters } from '@/shared/lib/queryKeys';

const STALE_TIME = 5 * 60 * 1000;

export const useVehicles = (filters?: VehicleFilters) => {
  return useQuery({
    queryKey: queryKeys.vehicles(filters),
    queryFn: () => getVehicles(filters),
    staleTime: STALE_TIME,
  });
};
