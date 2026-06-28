import { useMemo } from 'react';
import type { Incident } from '@/shared/types/incident';
import { StatusBadge } from '@/shared/components/StatusBadge';
import {
  INCIDENT_STATUS_LABELS,
  INCIDENT_TYPE_LABELS,
} from '@/shared/lib/labels';
import { formatRelativeTime } from '@/shared/lib/format';
import { filterByZone } from '@/shared/lib/filters';
import { cn } from '@/shared/lib/utils';

type IncidentTableProps = {
  incidents: Incident[];
  zoneId: string;
  selectedId?: string;
  getZoneName: (zoneId: string) => string;
  onSelect: (incident: Incident) => void;
};

export const IncidentTable = ({
  incidents,
  zoneId,
  selectedId,
  getZoneName,
  onSelect,
}: IncidentTableProps) => {
  const rows = useMemo(
    () => filterByZone(incidents, zoneId),
    [incidents, zoneId],
  );

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-muted-foreground text-left text-xs uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 font-medium">Descripción</th>
            <th className="px-4 py-3 font-medium">Zona</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Creado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((incident) => (
            <tr
              key={incident.id}
              onClick={() => onSelect(incident)}
              className={cn(
                'border-border hover:bg-muted/30 cursor-pointer border-t transition-colors',
                selectedId === incident.id && 'bg-muted/50',
              )}
            >
              <td className="px-4 py-3 font-mono">#{incident.id}</td>
              <td className="px-4 py-3 font-mono text-xs">
                {INCIDENT_TYPE_LABELS[incident.type]}
              </td>
              <td className="max-w-xs truncate px-4 py-3">
                {incident.description}
              </td>
              <td className="px-4 py-3">{getZoneName(incident.zoneId)}</td>
              <td className="px-4 py-3">
                <StatusBadge
                  kind="incident"
                  status={incident.status}
                  label={INCIDENT_STATUS_LABELS[incident.status]}
                />
              </td>
              <td className="text-muted-foreground px-4 py-3 text-xs">
                {formatRelativeTime(incident.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
