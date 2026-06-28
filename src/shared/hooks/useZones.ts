import { useQuery } from '@tanstack/react-query';
import { getZones } from '../api/zones.api';

export const useZones = () => {
  return useQuery({
    queryKey: ['zones'],
    queryFn: getZones,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
