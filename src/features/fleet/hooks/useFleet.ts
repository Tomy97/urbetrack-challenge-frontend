import { useState, useMemo } from 'react';
import { useVehicles } from '@/shared/hooks/useVehicles';
import { useZones } from '@/shared/hooks/useZones';
import { useZoneLookup } from '@/shared/hooks/useZoneLookup';
import { useZoneFilterStore } from '@/shared/store/zone-filter.store';
import { filterByZone } from '@/shared/lib/filters';
import { VEHICLE_STATUS } from '@/shared/constants/domain';
import {
  FILTER_ALL,
  isAllZones,
  isFilterAll,
} from '@/shared/constants/filters';
import type { VehicleStatus, VehicleType } from '@/shared/types/vehicle';
import type { Zone } from '@/shared/types/zone';

type VehicleStatusFilter = VehicleStatus | typeof FILTER_ALL;
type VehicleTypeFilter = VehicleType | typeof FILTER_ALL;

export const useFleet = () => {
  const zoneId = useZoneFilterStore((s) => s.zoneId);
  const { data: zones = [] } = useZones();
  const { getZoneName } = useZoneLookup();

  const [statusFilter, setStatusFilter] = useState<VehicleStatusFilter>(
    FILTER_ALL,
  );
  const [typeFilter, setTypeFilter] = useState<VehicleTypeFilter>(FILTER_ALL);

  const apiFilters = {
    ...(!isFilterAll(statusFilter) ? { status: statusFilter } : {}),
    ...(!isFilterAll(typeFilter) ? { type: typeFilter } : {}),
  };

  const { data: vehicles = [], isLoading } = useVehicles(
    Object.keys(apiFilters).length ? apiFilters : undefined,
  );

  const filtered = useMemo(
    () => filterByZone(vehicles, zoneId),
    [vehicles, zoneId],
  );

  const activeCount = filtered.filter(
    (vehicle) => vehicle.status === VEHICLE_STATUS.ACTIVE,
  ).length;

  const zoneSummary = useMemo(() => {
    const relevantZones: Zone[] = isAllZones(zoneId)
      ? zones
      : zones.filter((zone) => zone.id === zoneId);

    return relevantZones.map((zone) => {
      const zoneVehicles = vehicles.filter(
        (vehicle) => vehicle.zoneId === zone.id,
      );
      const active = zoneVehicles.filter(
        (vehicle) => vehicle.status === VEHICLE_STATUS.ACTIVE,
      ).length;
      return {
        zoneId: zone.id,
        zoneName: zone.name,
        active,
        total: zoneVehicles.length,
      };
    });
  }, [vehicles, zones, zoneId]);

  return {
    filtered,
    zoneSummary,
    activeCount,
    isLoading,
    getZoneName,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
  };
};
