import { useFleet } from '@/features/fleet/hooks/useFleet';
import { FleetArticle } from '../components/FleetArticle';
import { FleetForZone } from '../components/FleetForZone';
import { TypeVehicleSelect } from '../components/select/TypeVehicleSelect';
import { StateVehicleSelect } from '../components/select/StateVehicleSelect';

export const FleetView = () => {
  const {
    filtered,
    zoneSummary,
    activeCount,
    isLoading,
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
        <FleetForZone zonesSummary={zoneSummary} />
      </section>
      <div className="flex flex-wrap gap-3">
        <TypeVehicleSelect value={typeFilter} setValue={setTypeFilter} />
        <StateVehicleSelect value={statusFilter} setValue={setStatusFilter} />
      </div>
      <FleetArticle vehicle={filtered} />
    </div>
  );
};
