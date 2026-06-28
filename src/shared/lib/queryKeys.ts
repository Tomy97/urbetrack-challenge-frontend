import type { AssetStatus, AssetType } from '@/shared/types/asset';
import type { IncidentStatus, IncidentType } from '@/shared/types/incident';
import type { VehicleStatus, VehicleType } from '@/shared/types/vehicle';

export type IncidentFilters = {
  status?: IncidentStatus;
  type?: IncidentType;
};

export type AssetFilters = {
  status?: AssetStatus;
  type?: AssetType;
};

export type VehicleFilters = {
  status?: VehicleStatus;
  type?: VehicleType;
};

export const queryKeys = {
  zones: () => ['zones'] as const,
  incidents: (filters?: IncidentFilters) => ['incidents', filters] as const,
  incident: (id: string) => ['incidents', id] as const,
  assets: (filters?: AssetFilters) => ['assets', filters] as const,
  vehicles: (filters?: VehicleFilters) => ['vehicles', filters] as const,
};
