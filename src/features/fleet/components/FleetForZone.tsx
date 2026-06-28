interface FleetForZoneProp {
  zonesSummary: {
    zoneId: string;
    zoneName: string;
    active: number;
    total: number;
  }[];
}
export const FleetForZone = ({ zonesSummary }: FleetForZoneProp) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {zonesSummary.map((entry) => (
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
  );
};
