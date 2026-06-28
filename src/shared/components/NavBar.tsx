import { useMemo } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { NavComponent } from './Nav';
import { ReportIncidentDialog } from './dialog/ReportIncidentDialog';
import { useZones } from '../hooks/useZones';
import { useIncidents } from '../hooks/useIncidents';
import { useZoneFilterStore } from '../store/zone-filter.store';
import { filterByZone } from '../lib/filters';
import { isActiveIncidentStatus } from '@/shared/constants/domain';
import {
  ALL_ZONES_LABEL,
  FILTER_ALL,
} from '@/shared/constants/filters';
import type { Zone } from '../types/zone';

export const NavbarComponent = () => {
  const zoneId = useZoneFilterStore((s) => s.zoneId);
  const setZoneId = useZoneFilterStore((s) => s.setZoneId);
  const { data: zones } = useZones();
  const { data: incidents = [] } = useIncidents();

  const activeIncidents = useMemo(() => {
    const filtered = filterByZone(incidents, zoneId);
    return filtered.filter((item) => isActiveIncidentStatus(item.status)).length;
  }, [incidents, zoneId]);

  return (
    <header className="border-border bg-background/80 sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur-md lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-sidebar w-72 p-0">
          <div className="mt-2">
            <NavComponent />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 items-center gap-3">
        <Select value={zoneId} onValueChange={setZoneId}>
          <SelectTrigger className="bg-card h-9 w-[180px]">
            <SelectValue placeholder="Zona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>{ALL_ZONES_LABEL}</SelectItem>
            {zones?.map((z: Zone) => (
              <SelectItem key={z.id} value={z.id}>
                {z.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Badge
          variant="outline"
          className="border-destructive/40 bg-destructive/10 text-destructive hidden sm:inline-flex"
        >
          {activeIncidents} incidentes activos
        </Badge>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ReportIncidentDialog />
      </div>
    </header>
  );
};
