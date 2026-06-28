import { create } from 'zustand';
import { FILTER_ALL } from '@/shared/constants/filters';

type ZoneFilterState = {
  zoneId: string;
  setZoneId: (zoneId: string) => void;
};

export const useZoneFilterStore = create<ZoneFilterState>((set) => ({
  zoneId: FILTER_ALL,
  setZoneId: (zoneId) => set({ zoneId }),
}));
