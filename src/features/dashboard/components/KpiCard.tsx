import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

type KpiCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
};

export const KpiCard = ({ title, value, icon, className }: KpiCardProps) => (
  <div
    className={cn(
      'bg-card border-border flex flex-col gap-3 rounded-xl border p-5',
      className,
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {title}
      </p>
      <div className="text-muted-foreground">{icon}</div>
    </div>
    <div>
      <p className="text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  </div>
);
