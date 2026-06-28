import {
  AlertTriangle,
  LayoutDashboard,
  Map,
  Boxes,
  Truck,
} from 'lucide-react';
import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from '../lib/utils';
import { NAME_ROUTE } from '@/shared/constants/name-route';

const nav = [
  { to: NAME_ROUTE.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: NAME_ROUTE.MAP, label: 'Mapa Operativo', icon: Map },
  { to: NAME_ROUTE.INCIDENT, label: 'Incidentes', icon: AlertTriangle },
  { to: NAME_ROUTE.ASSETS, label: 'Mobiliario urbano', icon: Boxes },
  { to: NAME_ROUTE.FLEET, label: 'Flota', icon: Truck },
] as const;

export const NavComponent = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <nav className="flex flex-col gap-1 px-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active =
            item.to === NAME_ROUTE.DASHBOARD
              ? pathname === NAME_ROUTE.DASHBOARD
              : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => undefined}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
