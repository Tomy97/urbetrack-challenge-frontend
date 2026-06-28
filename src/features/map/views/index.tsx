import { Route } from '@/routes/map';
import { useMemo } from 'react';
import { ClientOnly } from '@/shared/components/ClientOnly';
import { OperationalMap } from '@/shared/components/map/OperationalMap';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useIncidents } from '@/shared/hooks/useIncidents';
import { useAssets } from '@/shared/hooks/useAssets';
import { useZoneLookup } from '@/shared/hooks/useZoneLookup';
import { useZoneFilterStore } from '@/shared/store/zone-filter.store';
import { filterByZone } from '@/shared/lib/filters';
import { cn } from '@/shared/lib/utils';
import type { MapSearch } from '@/features/map/schemas/map-search.schema';
import { INCIDENT_TYPE, isActiveIncidentStatus } from '@/shared/constants/domain';
import {
  FILTER_ALL,
  MAP_INCIDENT_SCOPE,
  MAP_LAYER,
  MAP_LAYER_VALUES,
  isFilterAll,
} from '@/shared/constants/filters';

const routeApi = Route;

export const MapViews = () => {
  const navigate = routeApi.useNavigate();
  const {
    incidentId,
    layer = MAP_LAYER.BOTH,
    activeOnly = true,
    type,
  } = routeApi.useSearch();
  const zoneId = useZoneFilterStore((s) => s.zoneId);
  const { getZoneName } = useZoneLookup();

  const incidentFilters = type ? { type } : undefined;
  const { data: incidents = [], isLoading: loadingIncidents } =
    useIncidents(incidentFilters);
  const { data: assets = [], isLoading: loadingAssets } = useAssets();

  const filteredIncidents = useMemo(() => {
    let items = filterByZone(incidents, zoneId);
    if (activeOnly) {
      items = items.filter((item) => isActiveIncidentStatus(item.status));
    }
    return items;
  }, [incidents, zoneId, activeOnly]);

  const filteredAssets = useMemo(
    () => filterByZone(assets, zoneId),
    [assets, zoneId],
  );

  const setSearch = (patch: Partial<MapSearch>) => {
    navigate({
      search: {
        incidentId,
        layer,
        activeOnly,
        type,
        ...patch,
      },
    });
  };

  if (loadingIncidents || loadingAssets) {
    return (
      <div className="text-muted-foreground p-6 text-sm">Cargando mapa…</div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <div className="absolute top-4 left-14 z-[1000] flex flex-wrap gap-2">
        <Select
          value={
            activeOnly ? MAP_INCIDENT_SCOPE.ACTIVE : MAP_INCIDENT_SCOPE.ALL
          }
          onValueChange={(value) =>
            setSearch({ activeOnly: value === MAP_INCIDENT_SCOPE.ACTIVE })
          }
        >
          <SelectTrigger className="bg-card/95 h-9 w-[150px] backdrop-blur">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={MAP_INCIDENT_SCOPE.ACTIVE}>
              Solo activos
            </SelectItem>
            <SelectItem value={MAP_INCIDENT_SCOPE.ALL}>Todos</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={type ?? FILTER_ALL}
          onValueChange={(value) =>
            setSearch({
              type: isFilterAll(value)
                ? undefined
                : (value as MapSearch['type']),
            })
          }
        >
          <SelectTrigger className="bg-card/95 h-9 w-[180px] backdrop-blur">
            <SelectValue placeholder="Cualquier tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>Cualquier tipo</SelectItem>
            <SelectItem value={INCIDENT_TYPE.OVERFLOW}>Desborde</SelectItem>
            <SelectItem value={INCIDENT_TYPE.DAMAGE}>Daño</SelectItem>
            <SelectItem value={INCIDENT_TYPE.LITTERING}>Basura</SelectItem>
            <SelectItem value={INCIDENT_TYPE.OTHER}>Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card/95 absolute top-4 right-4 z-[1000] flex rounded-lg p-1 backdrop-blur">
        {MAP_LAYER_VALUES.map((mode) => (
          <Button
            key={mode}
            size="sm"
            variant="ghost"
            className={cn(
              'capitalize',
              layer === mode && 'bg-background shadow-sm',
            )}
            onClick={() => setSearch({ layer: mode })}
          >
            {mode === MAP_LAYER.INCIDENTS
              ? 'Incidentes'
              : mode === MAP_LAYER.ASSETS
                ? 'Assets'
                : 'Ambos'}
          </Button>
        ))}
      </div>

      {incidentId && (
        <div className="bg-success/15 text-success border-success/30 absolute top-16 right-4 z-[1000] rounded-md border px-3 py-1.5 text-xs font-medium backdrop-blur">
          Centrado en Incidente #{incidentId}
        </div>
      )}

      <ClientOnly>
        <OperationalMap
          incidents={filteredIncidents}
          assets={filteredAssets}
          layer={layer}
          focusIncidentId={incidentId}
          getZoneName={getZoneName}
          showLegend
          className="h-full rounded-none"
        />
      </ClientOnly>
    </div>
  );
};
