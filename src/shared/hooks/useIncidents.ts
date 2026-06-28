import { useQuery } from '@tanstack/react-query';
import { getIncidents } from '@/shared/api/incidets.api';
import { queryKeys, type IncidentFilters } from '@/shared/lib/queryKeys';

const STALE_TIME = 5 * 60 * 1000;

export const useIncidents = (filters?: IncidentFilters) => {
  return useQuery({
    queryKey: queryKeys.incidents(filters),
    queryFn: () => getIncidents(filters),
    staleTime: STALE_TIME,
  });
};
