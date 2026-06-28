import type { AssetStatus, AssetType } from '@/shared/types/asset';
import type { IncidentStatus, IncidentType } from '@/shared/types/incident';
import type { VehicleStatus, VehicleType } from '@/shared/types/vehicle';
import {
  ASSET_STATUS,
  ASSET_TYPE,
  INCIDENT_STATUS,
  INCIDENT_TYPE,
  VEHICLE_STATUS,
  VEHICLE_TYPE,
} from '@/shared/constants/domain';

export const INCIDENT_TYPE_LABELS: Record<IncidentType, string> = {
  [INCIDENT_TYPE.OVERFLOW]: 'DESBORDE',
  [INCIDENT_TYPE.DAMAGE]: 'DAÑO',
  [INCIDENT_TYPE.LITTERING]: 'BASURA',
  [INCIDENT_TYPE.OTHER]: 'OTRO',
};

export const INCIDENT_STATUS_LABELS: Record<IncidentStatus, string> = {
  [INCIDENT_STATUS.REPORTED]: 'Reportado',
  [INCIDENT_STATUS.IN_PROGRESS]: 'En progreso',
  [INCIDENT_STATUS.RESOLVED]: 'Resuelto',
};

export const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  [ASSET_TYPE.BIN]: 'Tacho',
  [ASSET_TYPE.CONTAINER]: 'Contenedor',
  [ASSET_TYPE.BENCH]: 'Banco',
};

export const ASSET_STATUS_LABELS: Record<AssetStatus, string> = {
  [ASSET_STATUS.OK]: 'OK',
  [ASSET_STATUS.DAMAGED]: 'Dañado',
  [ASSET_STATUS.FULL]: 'Lleno',
  [ASSET_STATUS.OUT_OF_SERVICE]: 'Fuera de servicio',
};

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  [VEHICLE_TYPE.TRUCK]: 'Camión',
  [VEHICLE_TYPE.VAN]: 'Van',
  [VEHICLE_TYPE.PICKUP]: 'Pickup',
};

export const VEHICLE_STATUS_LABELS: Record<VehicleStatus, string> = {
  [VEHICLE_STATUS.ACTIVE]: 'Activo',
  [VEHICLE_STATUS.MAINTENANCE]: 'Mantenimiento',
  [VEHICLE_STATUS.OUT_OF_SERVICE]: 'Fuera de servicio',
};
