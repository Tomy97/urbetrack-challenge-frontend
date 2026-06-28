import { useQuery } from '@tanstack/react-query';
import { getAssets } from '@/shared/api/assets.api';
import { queryKeys, type AssetFilters } from '@/shared/lib/queryKeys';

const STALE_TIME = 5 * 60 * 1000;

export const useAssets = (filters?: AssetFilters) => {
  return useQuery({
    queryKey: queryKeys.assets(filters),
    queryFn: () => getAssets(filters),
    staleTime: STALE_TIME,
  });
};
