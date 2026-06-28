import { useMemo } from 'react';
import { useZones } from '@/shared/hooks/useZones';
import type { Zone } from '@/shared/types/zone';

export const useZoneLookup = () => {
  const { data: zones = [] } = useZones();

  const zoneMap = useMemo(
    () => new Map<string, string>(zones.map((zone: Zone) => [zone.id, zone.name])),
    [zones],
  );

  const getZoneName = (zoneId: string): string =>
    zoneMap.get(zoneId) ?? `Zona ${zoneId}`;

  return { zones, zoneMap, getZoneName };
};
