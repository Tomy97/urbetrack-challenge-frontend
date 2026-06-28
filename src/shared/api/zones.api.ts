import axios from 'axios';
import type { Zone } from '@/shared/types/zone';

const API_URL = `${import.meta.env.VITE_API_URL}/zones`;

export const getZones = async (): Promise<Zone[]> => {
  const { data } = await axios.get<Zone[]>(API_URL);
  return data;
};
