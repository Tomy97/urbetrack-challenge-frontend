import type { AssetStatus } from '@/shared/types/asset';
import type { IncidentStatus } from '@/shared/types/incident';
import type { VehicleStatus } from '@/shared/types/vehicle';
import { cn } from '@/shared/lib/utils';
import {
  ASSET_STATUS,
  INCIDENT_STATUS,
  VEHICLE_STATUS,
} from '@/shared/constants/domain';

type StatusKind = 'incident' | 'asset' | 'vehicle';

const incidentStyles: Record<IncidentStatus, string> = {
  [INCIDENT_STATUS.REPORTED]:
    'border-destructive/40 bg-destructive/10 text-destructive',
  [INCIDENT_STATUS.IN_PROGRESS]:
    'border-warning/40 bg-warning/10 text-warning',
  [INCIDENT_STATUS.RESOLVED]:
    'border-success/40 bg-success/10 text-success',
};

const assetStyles: Record<AssetStatus, string> = {
  [ASSET_STATUS.OK]: 'border-success/40 bg-success/10 text-success',
  [ASSET_STATUS.DAMAGED]: 'border-warning/40 bg-warning/10 text-warning',
  [ASSET_STATUS.FULL]: 'border-warning/40 bg-warning/10 text-warning',
  [ASSET_STATUS.OUT_OF_SERVICE]:
    'border-destructive/40 bg-destructive/10 text-destructive',
};

const vehicleStyles: Record<VehicleStatus, string> = {
  [VEHICLE_STATUS.ACTIVE]: 'border-success/40 bg-success/10 text-success',
  [VEHICLE_STATUS.MAINTENANCE]: 'border-warning/40 bg-warning/10 text-warning',
  [VEHICLE_STATUS.OUT_OF_SERVICE]:
    'border-destructive/40 bg-destructive/10 text-destructive',
};

type StatusBadgeProps = {
  label: string;
  kind: StatusKind;
  status: IncidentStatus | AssetStatus | VehicleStatus;
  className?: string;
};

export const StatusBadge = ({
  label,
  kind,
  status,
  className,
}: StatusBadgeProps) => {
  const styles =
    kind === 'incident'
      ? incidentStyles[status as IncidentStatus]
      : kind === 'asset'
        ? assetStyles[status as AssetStatus]
        : vehicleStyles[status as VehicleStatus];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        styles,
        className,
      )}
    >
      {label}
    </span>
  );
};

export function getIncidentMarkerColor(status: IncidentStatus): string {
  if (status === INCIDENT_STATUS.REPORTED) return '#ef4444';
  if (status === INCIDENT_STATUS.IN_PROGRESS) return '#f97316';
  return '#22c55e';
}

export function getAssetMarkerColor(status: AssetStatus): string {
  if (status === ASSET_STATUS.OUT_OF_SERVICE) return '#ef4444';
  if (status === ASSET_STATUS.DAMAGED) return '#f97316';
  if (status === ASSET_STATUS.FULL) return '#eab308';
  return '#22c55e';
}
