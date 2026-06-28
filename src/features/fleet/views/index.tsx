import { Truck } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { useFleet } from '@/features/fleet/hooks/useFleet';
import {
  VEHICLE_STATUS_LABELS,
  VEHICLE_TYPE_LABELS,
} from '@/shared/lib/labels';
import { formatCapacity } from '@/shared/lib/format';
import { VEHICLE_STATUS, VEHICLE_TYPE } from '@/shared/constants/domain';
import { FILTER_ALL } from '@/shared/constants/filters';
import type { VehicleStatus, VehicleType } from '@/shared/types/vehicle';

export const FleetView = () => {
  const {
    filtered,
    zoneSummary,
    activeCount,
    isLoading,
    getZoneName,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
  } = useFleet();

  if (isLoading) {
    return (
      <div className="text-muted-foreground p-6 text-sm">Cargando flota…</div>
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Flota operativa
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {activeCount} vehículos activos de {filtered.length} en el sistema
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold">Flota activa por zona</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {zoneSummary.map((entry) => (
            <div
              key={entry.zoneId}
              className="bg-card border-border rounded-xl border p-4"
            >
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                {entry.zoneName}
              </p>
              <p className="text-success mt-2 text-lg font-semibold">
                {entry.active}/{entry.total}{' '}
                <span className="text-muted-foreground text-sm font-normal">
                  activos
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Select
          value={typeFilter}
          onValueChange={(value) =>
            setTypeFilter(value as VehicleType | typeof FILTER_ALL)
          }
        >
          <SelectTrigger className="bg-card h-9 w-[180px]">
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>Todos los tipos</SelectItem>
            <SelectItem value={VEHICLE_TYPE.TRUCK}>Camión</SelectItem>
            <SelectItem value={VEHICLE_TYPE.VAN}>Van</SelectItem>
            <SelectItem value={VEHICLE_TYPE.PICKUP}>Pickup</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as VehicleStatus | typeof FILTER_ALL)
          }
        >
          <SelectTrigger className="bg-card h-9 w-[180px]">
            <SelectValue placeholder="Cualquier estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>Cualquier estado</SelectItem>
            <SelectItem value={VEHICLE_STATUS.ACTIVE}>Activo</SelectItem>
            <SelectItem value={VEHICLE_STATUS.MAINTENANCE}>
              Mantenimiento
            </SelectItem>
            <SelectItem value={VEHICLE_STATUS.OUT_OF_SERVICE}>
              Fuera de servicio
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((vehicle) => (
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
                <dd className="text-foreground">
                  {getZoneName(vehicle.zoneId)}
                </dd>
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
    </div>
  );
};
