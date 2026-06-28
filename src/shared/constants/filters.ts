export const FILTER_ALL = 'ALL' as const;

export type FilterAllValue = typeof FILTER_ALL;

export const INCIDENT_VIEW = {
  KANBAN: 'kanban',
  TABLE: 'table',
} as const;

export const INCIDENT_VIEW_VALUES = [
  INCIDENT_VIEW.KANBAN,
  INCIDENT_VIEW.TABLE,
] as const;

export type IncidentView =
  (typeof INCIDENT_VIEW)[keyof typeof INCIDENT_VIEW];

export const MAP_LAYER = {
  INCIDENTS: 'incidents',
  ASSETS: 'assets',
  BOTH: 'both',
} as const;

export const MAP_LAYER_VALUES = [
  MAP_LAYER.INCIDENTS,
  MAP_LAYER.ASSETS,
  MAP_LAYER.BOTH,
] as const;

export type MapLayer = (typeof MAP_LAYER)[keyof typeof MAP_LAYER];

export const MAP_INCIDENT_SCOPE = {
  ACTIVE: 'active',
  ALL: 'all',
} as const;

export const ALL_ZONES_LABEL = 'Todas las zonas';
export const DEFAULT_ZONE_LABEL = 'Zona';

export function isFilterAll(value: string): value is FilterAllValue {
  return value === FILTER_ALL;
}

export function isAllZones(zoneId: string): boolean {
  return zoneId === FILTER_ALL;
}
