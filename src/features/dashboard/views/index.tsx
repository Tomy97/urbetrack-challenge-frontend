import { Link } from '@tanstack/react-router';
import { AlertTriangle, ArrowRight, Box, Truck } from 'lucide-react';
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboardStats';
import { ClientOnly } from '@/shared/components/ClientOnly';
import { KpiCard } from '@/features/dashboard/components/KpiCard';
import { OperationalMap } from '@/shared/components/map/OperationalMap';
import { StatusBadge } from '@/shared/components/StatusBadge';
import {
  INCIDENT_STATUS_LABELS,
  INCIDENT_TYPE_LABELS,
} from '@/shared/lib/labels';
import { formatNumber, formatRelativeTime } from '@/shared/lib/format';
import { NAME_ROUTE } from '@/shared/constants/name-route';

export const DashboardView = () => {
  const { stats, isLoading, getZoneName } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="text-muted-foreground p-6 text-sm">
        Cargando centro de operaciones…
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Centro de operaciones
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {stats.zoneLabel} · {formatNumber(stats.totalIncidents)} incidentes ·{' '}
          {formatNumber(stats.totalAssets)} assets ·{' '}
          {formatNumber(stats.totalVehicles)} vehículos
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Incidentes reportados"
          value={stats.reported}
          icon={<AlertTriangle className="text-destructive h-5 w-5" />}
        />
        <KpiCard
          title="En progreso"
          value={stats.inProgress}
          icon={<ArrowRight className="text-warning h-5 w-5" />}
        />
        <KpiCard
          title="Assets fuera de servicio"
          value={stats.assetsOutOfService}
          icon={<Box className="h-5 w-5" />}
        />
        <KpiCard
          title="Vehículos activos"
          value={stats.activeVehicles}
          icon={<Truck className="text-success h-5 w-5" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="bg-card border-border rounded-xl border p-5">
          <h2 className="mb-4 text-sm font-semibold">
            Incidentes activos por zona
          </h2>
          <div className="space-y-3">
            {stats.incidentsByZone.map((entry) => (
              <div key={entry.zoneId} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{entry.zoneName}</span>
                  <span className="text-muted-foreground font-mono text-xs">
                    {entry.count}
                  </span>
                </div>
                <div className="bg-muted h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{
                      width: `${(entry.count / stats.maxZoneCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card border-border rounded-xl border p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              Incidentes activos en mapa ({stats.activeIncidentsCount})
            </h2>
          </div>
          <ClientOnly>
            <OperationalMap
              incidents={stats.mapIncidents}
              getZoneName={getZoneName}
              showLink
              interactive={false}
              className="h-[320px]"
            />
          </ClientOnly>
        </section>
      </div>

      <section className="bg-card border-border rounded-xl border p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Últimos incidentes</h2>
          <Link
            to={NAME_ROUTE.INCIDENT}
            className="text-primary text-xs font-medium hover:underline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="divide-border divide-y">
          {stats.recentIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground font-mono">
                    #{incident.id}
                  </span>
                  <span className="font-mono text-xs tracking-wide">
                    {INCIDENT_TYPE_LABELS[incident.type]}
                  </span>
                </div>
                <p className="truncate text-sm">{incident.description}</p>
                <p className="text-muted-foreground text-xs">
                  {getZoneName(incident.zoneId)} ·{' '}
                  {formatRelativeTime(incident.createdAt)}
                </p>
              </div>
              <StatusBadge
                kind="incident"
                status={incident.status}
                label={INCIDENT_STATUS_LABELS[incident.status]}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
