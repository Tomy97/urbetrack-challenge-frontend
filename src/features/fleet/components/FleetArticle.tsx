import { StatusBadge } from '@/shared/components/StatusBadge';
import { formatCapacity } from '@/shared/lib/format';
import {
  VEHICLE_STATUS_LABELS,
  VEHICLE_TYPE_LABELS,
} from '@/shared/lib/labels';
import type { Vehicle } from '@/shared/types/vehicle';
import { Truck } from 'lucide-react';
import { useFleet } from '../hooks/useFleet';

interface FleetArticleProp {
  vehicle: Vehicle[];
}
export const FleetArticle = ({ vehicle }: FleetArticleProp) => {
  const { getZoneName } = useFleet();
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {vehicle.map((vehicle) => (
        <article
          key={vehicle.id}
          className="bg-card border-border rounded-xl border p-4"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Truck className="text-muted-foreground h-4 w-4" />
              <span className="font-mono font-semibold">{vehicle.plate}</span>
            </div>
            <StatusBadge
              kind="vehicle"
              status={vehicle.status}
              label={VEHICLE_STATUS_LABELS[vehicle.status]}
            />
          </div>
          <dl className="text-muted-foreground space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <dt>Tipo</dt>
              <dd className="text-foreground">
                {VEHICLE_TYPE_LABELS[vehicle.type]}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Zona</dt>
              <dd className="text-foreground">{getZoneName(vehicle.zoneId)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Capacidad</dt>
              <dd className="text-foreground font-mono text-xs">
                {formatCapacity(vehicle.capacity)}
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
};
