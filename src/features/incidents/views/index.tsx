import { Route } from '@/routes/incidents';
import { useMemo } from 'react';
import { IncidentDetailPanel } from '@/features/incidents/components/IncidentDetailPanel';
import { Button } from '@/shared/components/ui/button';
import { useIncidents } from '@/shared/hooks/useIncidents';
import { useZoneLookup } from '@/shared/hooks/useZoneLookup';
import { useZoneFilterStore } from '@/shared/store/zone-filter.store';
import { filterByZone } from '@/shared/lib/filters';
import { cn } from '@/shared/lib/utils';
import type { IncidentSearch } from '@/features/incidents/schemas/incident-search.schema';
import {
  FILTER_ALL,
  INCIDENT_VIEW,
  INCIDENT_VIEW_VALUES,
} from '@/shared/constants/filters';
import { IncidentTypeView } from '../components/IncidentTypeView';
import { IncidentTypeSelect } from '../components/select/IncidentTypeSelect';

const routeApi = Route;

export const IncidentsViews = () => {
  const navigate = routeApi.useNavigate();
  const {
    view = INCIDENT_VIEW.KANBAN,
    type,
    incidentId,
  } = routeApi.useSearch();
  const zoneId = useZoneFilterStore((s) => s.zoneId);
  const { getZoneName } = useZoneLookup();

  const filters = type ? { type } : undefined;
  const { data: incidents = [], isLoading } = useIncidents(filters);

  const zoneFiltered = useMemo(
    () => filterByZone(incidents, zoneId),
    [incidents, zoneId],
  );

  const selectedIncident = useMemo(
    () => incidents.find((item) => item.id === incidentId),
    [incidents, incidentId],
  );

  const setSearch = (patch: Partial<IncidentSearch>) => {
    navigate({
      search: {
        view,
        type,
        incidentId,
        ...patch,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="text-muted-foreground p-6 text-sm">
        Cargando bandeja de incidentes…
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <div className="min-w-0 flex-1 space-y-4 p-4 lg:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Bandeja de incidentes
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {zoneFiltered.length} de {incidents.length} incidentes en el
              sistema.
            </p>
          </div>

          <div className="bg-muted/40 flex rounded-lg p-1">
            {INCIDENT_VIEW_VALUES.map((mode) => (
              <Button
                key={mode}
                size="sm"
                variant="ghost"
                className={cn(
                  'capitalize',
                  view === mode && 'bg-background shadow-sm',
                )}
                onClick={() => setSearch({ view: mode })}
              >
                {mode === INCIDENT_VIEW.KANBAN ? 'Kanban' : 'Tabla'}
              </Button>
            ))}
          </div>
        </div>
        <IncidentTypeSelect
          type={type ?? FILTER_ALL}
          onChange={(value) => setSearch({ type: value })}
        />
        <IncidentTypeView
          typeView={view}
          incidents={incidents}
          zoneId={zoneId}
          incidentId={incidentId}
          getZoneName={getZoneName}
          onSelect={(incident) => setSearch({ incidentId: incident.id })}
        />
      </div>

      <IncidentDetailPanel
        incident={selectedIncident}
        zoneName={selectedIncident ? getZoneName(selectedIncident.zoneId) : ''}
        onClose={() => setSearch({ incidentId: undefined })}
      />
    </div>
  );
};
