import type { Incident } from '@/shared/types/incident';
import { StatusBadge } from '@/shared/components/StatusBadge';
import {
  INCIDENT_STATUS_LABELS,
  INCIDENT_TYPE_LABELS,
} from '@/shared/lib/labels';
import { formatRelativeTime } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';

type IncidentCardProps = Pick<
  Incident,
  'id' | 'type' | 'status' | 'description' | 'createdAt'
> & {
  zoneName: string;
  selected?: boolean;
  onSelect?: () => void;
};

export const IncidentCard = ({
  id,
  type,
  status,
  description,
  zoneName,
  createdAt,
  selected,
  onSelect,
}: IncidentCardProps) => (
  <button
    type="button"
    onClick={onSelect}
    className={cn(
      'bg-background hover:bg-muted/40 border-border w-full rounded-lg border p-3 text-left transition-colors',
      selected && 'ring-primary ring-2',
    )}
  >
    <div className="mb-2 flex items-center justify-between gap-2">
      <span className="text-muted-foreground font-mono text-xs">#{id}</span>
      <span className="font-mono text-[10px] tracking-wide">
        {INCIDENT_TYPE_LABELS[type]}
      </span>
    </div>
    <p className="line-clamp-2 text-sm leading-snug">{description}</p>
    <div className="text-muted-foreground mt-3 flex items-center justify-between gap-2 text-xs">
      <span>{zoneName}</span>
      <span>{formatRelativeTime(createdAt)}</span>
    </div>
    <div className="mt-2">
      <StatusBadge
        kind="incident"
        status={status}
        label={INCIDENT_STATUS_LABELS[status]}
      />
    </div>
  </button>
);
