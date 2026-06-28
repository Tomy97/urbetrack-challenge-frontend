import type { AssetStatus, AssetType } from '@/shared/types/asset';
import type { IncidentStatus, IncidentType } from '@/shared/types/incident';
import type { VehicleStatus, VehicleType } from '@/shared/types/vehicle';

export const INCIDENT_STATUS = {
  REPORTED: 'REPORTED',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
} as const satisfies Record<string, IncidentStatus>;

export const INCIDENT_TYPE = {
  OVERFLOW: 'OVERFLOW',
  DAMAGE: 'DAMAGE',
  LITTERING: 'LITTERING',
  OTHER: 'OTHER',
} as const satisfies Record<string, IncidentType>;

export const ASSET_STATUS = {
  OK: 'OK',
  DAMAGED: 'DAMAGED',
  FULL: 'FULL',
  OUT_OF_SERVICE: 'OUT_OF_SERVICE',
} as const satisfies Record<string, AssetStatus>;

export const ASSET_TYPE = {
  BIN: 'BIN',
  CONTAINER: 'CONTAINER',
  BENCH: 'BENCH',
} as const satisfies Record<string, AssetType>;

export const VEHICLE_STATUS = {
  ACTIVE: 'ACTIVE',
  MAINTENANCE: 'MAINTENANCE',
  OUT_OF_SERVICE: 'OUT_OF_SERVICE',
} as const satisfies Record<string, VehicleStatus>;

export const VEHICLE_TYPE = {
  TRUCK: 'TRUCK',
  VAN: 'VAN',
  PICKUP: 'PICKUP',
} as const satisfies Record<string, VehicleType>;

export const INCIDENT_STATUS_VALUES = [
  INCIDENT_STATUS.REPORTED,
  INCIDENT_STATUS.IN_PROGRESS,
  INCIDENT_STATUS.RESOLVED,
] as const;

export const INCIDENT_TYPE_VALUES = [
  INCIDENT_TYPE.OVERFLOW,
  INCIDENT_TYPE.DAMAGE,
  INCIDENT_TYPE.LITTERING,
  INCIDENT_TYPE.OTHER,
] as const;

export const ASSET_STATUS_VALUES = [
  ASSET_STATUS.OK,
  ASSET_STATUS.DAMAGED,
  ASSET_STATUS.FULL,
  ASSET_STATUS.OUT_OF_SERVICE,
] as const;

export const ASSET_TYPE_VALUES = [
  ASSET_TYPE.BIN,
  ASSET_TYPE.CONTAINER,
  ASSET_TYPE.BENCH,
] as const;

export const VEHICLE_STATUS_VALUES = [
  VEHICLE_STATUS.ACTIVE,
  VEHICLE_STATUS.MAINTENANCE,
  VEHICLE_STATUS.OUT_OF_SERVICE,
] as const;

export const VEHICLE_TYPE_VALUES = [
  VEHICLE_TYPE.TRUCK,
  VEHICLE_TYPE.VAN,
  VEHICLE_TYPE.PICKUP,
] as const;

export const ACTIVE_INCIDENT_STATUSES: readonly IncidentStatus[] = [
  INCIDENT_STATUS.REPORTED,
  INCIDENT_STATUS.IN_PROGRESS,
];

export const KANBAN_INCIDENT_STATUSES: readonly IncidentStatus[] = [
  INCIDENT_STATUS.REPORTED,
  INCIDENT_STATUS.IN_PROGRESS,
  INCIDENT_STATUS.RESOLVED,
];

export function isActiveIncidentStatus(status: IncidentStatus): boolean {
  return (
    status === INCIDENT_STATUS.REPORTED ||
    status === INCIDENT_STATUS.IN_PROGRESS
  );
}
