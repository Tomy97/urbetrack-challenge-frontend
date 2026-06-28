import { useMemo } from 'react';
import type { Incident } from '@/shared/types/incident';
import { IncidentCard } from './IncidentCard';
import { filterByZone } from '@/shared/lib/filters';
import { KANBAN_INCIDENT_STATUSES } from '@/shared/constants/domain';
import { INCIDENT_STATUS_LABELS } from '@/shared/lib/labels';

type IncidentKanbanProps = {
  incidents: Incident[];
  zoneId: string;
  selectedId?: string;
  getZoneName: (zoneId: string) => string;
  onSelect: (incident: Incident) => void;
};

export const IncidentKanban = ({
  incidents,
  zoneId,
  selectedId,
  getZoneName,
  onSelect,
}: IncidentKanbanProps) => {
  const filtered = useMemo(
    () => filterByZone(incidents, zoneId),
    [incidents, zoneId],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {KANBAN_INCIDENT_STATUSES.map((status) => {
        const columnItems = filtered.filter((item) => item.status === status);
        return (
          <div key={status} className="min-w-0">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium">
                {INCIDENT_STATUS_LABELS[status]}
              </h3>
              <span className="text-muted-foreground font-mono text-xs">
                {columnItems.length}
              </span>
            </div>
            <div className="space-y-2">
              {columnItems.map((incident) => (
                <IncidentCard
                  key={incident.id}
                  id={incident.id}
                  type={incident.type}
                  status={incident.status}
                  description={incident.description}
                  createdAt={incident.createdAt}
                  zoneName={getZoneName(incident.zoneId)}
                  selected={selectedId === incident.id}
                  onSelect={() => onSelect(incident)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
