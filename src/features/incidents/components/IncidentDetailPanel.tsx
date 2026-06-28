import { Link } from '@tanstack/react-router';
import { Lock, MapPin, X } from 'lucide-react';
import type { Incident } from '@/shared/types/incident';
import { Button } from '@/shared/components/ui/button';
import { StatusBadge } from '@/shared/components/StatusBadge';
import {
  INCIDENT_STATUS_LABELS,
  INCIDENT_TYPE_LABELS,
} from '@/shared/lib/labels';
import { formatRelativeTime } from '@/shared/lib/format';
import { NAME_ROUTE } from '@/shared/constants/name-route';
import { MAP_LAYER } from '@/shared/constants/filters';

type IncidentDetailPanelProps = {
  incident: Incident;
  zoneName: string;
  onClose: () => void;
};

export const IncidentDetailPanel = ({
  incident,
  zoneName,
  onClose,
}: IncidentDetailPanelProps) => (
  <aside className="bg-card border-border flex h-full w-full max-w-sm shrink-0 flex-col border-l">
    <div className="border-border flex items-center justify-between border-b px-4 py-3">
      <h2 className="font-mono text-sm tracking-wide">
        INCIDENTE #{incident.id}
      </h2>
      <Button variant="ghost" size="icon-sm" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>

    <div className="flex-1 space-y-5 overflow-y-auto p-4 text-sm">
      <DetailField
        label="Tipo"
        value={INCIDENT_TYPE_LABELS[incident.type]}
      />
      <div>
        <p className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
          Estado
        </p>
        <div className="flex items-center gap-2">
          <StatusBadge
            kind="incident"
            status={incident.status}
            label={INCIDENT_STATUS_LABELS[incident.status]}
          />
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <Lock className="h-3 w-3" /> solo lectura
          </span>
        </div>
      </div>
      <DetailField label="Descripción" value={incident.description} />
      <DetailField label="Zona" value={zoneName} />
      <DetailField
        label="Coordenadas"
        value={`${incident.lat}, ${incident.lng}`}
        mono
      />
      <DetailField
        label="Creado"
        value={`${formatRelativeTime(incident.createdAt)} · ${incident.createdAt}`}
        mono
      />
    </div>

    <div className="border-border border-t p-4">
      <Button asChild className="w-full gap-2">
        <Link
          to={NAME_ROUTE.MAP}
          search={{ incidentId: incident.id, layer: MAP_LAYER.INCIDENTS }}
        >
          <MapPin className="h-4 w-4" />
          Abrir en mapa
        </Link>
      </Button>
    </div>
  </aside>
);

function DetailField({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
        {label}
      </p>
      <p className={mono ? 'font-mono text-xs break-all' : ''}>{value}</p>
    </div>
  );
}
