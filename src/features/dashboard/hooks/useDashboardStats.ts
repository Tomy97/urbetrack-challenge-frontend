import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useZones } from '@/shared/hooks/useZones';
import { useZoneLookup } from '@/shared/hooks/useZoneLookup';
import { useZoneFilterStore } from '@/shared/store/zone-filter.store';
import { getIncidents } from '@/shared/api/incidets.api';
import { getAssets } from '@/shared/api/assets.api';
import { getVehicles } from '@/shared/api/vehicles.api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { filterByZone } from '@/shared/lib/filters';
import {
  ASSET_STATUS,
  INCIDENT_STATUS,
  isActiveIncidentStatus,
  VEHICLE_STATUS,
} from '@/shared/constants/domain';
import {
  ALL_ZONES_LABEL,
  DEFAULT_ZONE_LABEL,
  isAllZones,
} from '@/shared/constants/filters';

export const useDashboardStats = () => {
  const zoneId = useZoneFilterStore((s) => s.zoneId);
  const { data: zones = [] } = useZones();
  const { getZoneName } = useZoneLookup();

  const [incidentsQuery, assetsQuery, vehiclesQuery] = useQueries({
    queries: [
      {
        queryKey: queryKeys.incidents(),
        queryFn: () => getIncidents(),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: queryKeys.assets(),
        queryFn: () => getAssets(),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: queryKeys.vehicles(),
        queryFn: () => getVehicles(),
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const isLoading =
    incidentsQuery.isLoading ||
    assetsQuery.isLoading ||
    vehiclesQuery.isLoading;

  const stats = useMemo(() => {
    const incidents = incidentsQuery.data ?? [];
    const assets = assetsQuery.data ?? [];
    const vehicles = vehiclesQuery.data ?? [];

    const filteredIncidents = filterByZone(incidents, zoneId);
    const filteredAssets = filterByZone(assets, zoneId);
    const filteredVehicles = filterByZone(vehicles, zoneId);

    const activeIncidents = filteredIncidents.filter((incident) =>
      isActiveIncidentStatus(incident.status),
    );

    const incidentsByZone = zones
      .map((zone) => ({
        zoneId: zone.id,
        zoneName: zone.name,
        count: activeIncidents.filter((i) => i.zoneId === zone.id).length,
      }))
      .filter((entry) => isAllZones(zoneId) || entry.zoneId === zoneId)
      .sort((a, b) => b.count - a.count);

    const maxZoneCount = Math.max(...incidentsByZone.map((z) => z.count), 1);

    return {
      zoneLabel: isAllZones(zoneId)
        ? ALL_ZONES_LABEL
        : (zones.find((z) => z.id === zoneId)?.name ?? DEFAULT_ZONE_LABEL),
      reported: filteredIncidents.filter(
        (i) => i.status === INCIDENT_STATUS.REPORTED,
      ).length,
      inProgress: filteredIncidents.filter(
        (i) => i.status === INCIDENT_STATUS.IN_PROGRESS,
      ).length,
      activeIncidentsCount: activeIncidents.length,
      assetsOutOfService: filteredAssets.filter(
        (a) => a.status === ASSET_STATUS.OUT_OF_SERVICE,
      ).length,
      assetsDamaged: filteredAssets.filter(
        (a) => a.status === ASSET_STATUS.DAMAGED,
      ).length,
      activeVehicles: filteredVehicles.filter(
        (v) => v.status === VEHICLE_STATUS.ACTIVE,
      ).length,
      totalIncidents: filteredIncidents.length,
      totalAssets: filteredAssets.length,
      totalVehicles: filteredVehicles.length,
      incidentsByZone,
      maxZoneCount,
      mapIncidents: activeIncidents,
      recentIncidents: [...filteredIncidents]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5),
    };
  }, [
    incidentsQuery.data,
    assetsQuery.data,
    vehiclesQuery.data,
    zones,
    zoneId,
  ]);

  return { stats, isLoading, getZoneName };
};
