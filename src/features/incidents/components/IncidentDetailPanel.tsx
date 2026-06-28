import { Link } from '@tanstack/react-router';
import { Lock, MapPin } from 'lucide-react';
import type { Incident } from '@/shared/types/incident';
import { Button } from '@/shared/components/ui/button';
import { StatusBadge } from '@/shared/components/StatusBadge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet';
import {
  INCIDENT_STATUS_LABELS,
  INCIDENT_TYPE_LABELS,
} from '@/shared/lib/labels';
import { formatDateTime, formatRelativeTime } from '@/shared/lib/format';
import { NAME_ROUTE } from '@/shared/constants/name-route';
import { MAP_LAYER } from '@/shared/constants/filters';

type IncidentDetailPanelProps = {
  incident: Incident | undefined;
  zoneName: string;
  onClose: () => void;
};

export const IncidentDetailPanel = ({
  incident,
  zoneName,
  onClose,
}: IncidentDetailPanelProps) => (
  <Sheet open={!!incident} onOpenChange={(open) => !open && onClose()}>
    <SheetContent className="flex w-full max-w-md flex-col gap-0 p-0">
      <SheetHeader className="border-border border-b px-4 py-3">
        <SheetTitle className="font-mono text-sm tracking-wide">
          INCIDENTE #{incident?.id}
        </SheetTitle>
      </SheetHeader>

      {incident && (
        <>
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
              value={`${formatRelativeTime(incident.createdAt)} - ${formatDateTime(incident.createdAt)}`}
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
        </>
      )}
    </SheetContent>
  </Sheet>
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
