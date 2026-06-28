import axios from 'axios';
import type { UrbanAsset } from '@/shared/types/asset';
import type { AssetFilters } from '@/shared/lib/queryKeys';

const API_URL = `${import.meta.env.VITE_API_URL}/assets`;

export const getAssets = async (filters?: AssetFilters): Promise<UrbanAsset[]> => {
  const params: Record<string, string> = {};
  if (filters?.status) params.status = filters.status;
  if (filters?.type) params.type = filters.type;

  const { data } = await axios.get<UrbanAsset[]>(API_URL, { params });
  return data;
};
