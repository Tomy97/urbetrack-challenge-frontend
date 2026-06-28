import { useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from '@tanstack/react-router';
import type { Incident } from '@/shared/types/incident';
import type { UrbanAsset } from '@/shared/types/asset';
import {
  getIncidentMarkerColor,
  StatusBadge,
} from '@/shared/components/StatusBadge';
import {
  INCIDENT_STATUS_LABELS,
  INCIDENT_TYPE_LABELS,
} from '@/shared/lib/labels';
import { NAME_ROUTE } from '@/shared/constants/name-route';
import { MAP_LAYER, type MapLayer } from '@/shared/constants/filters';
import { AssetMarkerCluster } from '@/shared/components/map/AssetMarkerCluster';

const DEFAULT_CENTER: LatLngExpression = [-34.6037, -58.3816];

type OperationalMapProps = {
  incidents?: Incident[];
  assets?: UrbanAsset[];
  layer?: MapLayer;
  focusIncidentId?: string;
  getZoneName?: (zoneId: string) => string;
  className?: string;
  interactive?: boolean;
  showLegend?: boolean;
  showLink?: boolean;
};

function MapFocusController({
  incidents,
  focusIncidentId,
}: {
  incidents: Incident[];
  focusIncidentId?: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (!focusIncidentId) return;
    const incident = incidents.find((item) => item.id === focusIncidentId);
    if (!incident) return;
    map.flyTo([incident.lat, incident.lng], 15, { duration: 0.8 });
  }, [focusIncidentId, incidents, map]);

  return null;
}

export function OperationalMap({
  incidents = [],
  assets = [],
  layer = MAP_LAYER.INCIDENTS,
  focusIncidentId,
  getZoneName = (id) => id,
  className = 'h-[360px]',
  interactive = true,
  showLegend = false,
  showLink = false,
}: OperationalMapProps) {
  const visibleIncidents = layer === MAP_LAYER.ASSETS ? [] : incidents;
  const visibleAssets = layer === MAP_LAYER.INCIDENTS ? [] : assets;

  const center = useMemo(() => {
    if (focusIncidentId) {
      const incident = incidents.find((item) => item.id === focusIncidentId);
      if (incident) return [incident.lat, incident.lng] as LatLngExpression;
    }
    if (visibleIncidents[0]) {
      return [visibleIncidents[0].lat, visibleIncidents[0].lng] as LatLngExpression;
    }
    return DEFAULT_CENTER;
  }, [focusIncidentId, incidents, visibleIncidents]);

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {showLink && (
        <Link
          to={NAME_ROUTE.MAP}
          className="bg-background/90 text-primary absolute top-3 right-3 z-[1000] rounded-md px-2 py-1 text-xs font-medium backdrop-blur"
        >
          Abrir mapa →
        </Link>
      )}

      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={interactive}
        dragging={interactive}
        doubleClickZoom={interactive}
        className="h-full w-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFocusController
          incidents={incidents}
          focusIncidentId={focusIncidentId}
        />

        {visibleIncidents.map((incident) => (
          <CircleMarker
            key={`incident-${incident.id}`}
            center={[incident.lat, incident.lng]}
            radius={8}
            pathOptions={{
              color: getIncidentMarkerColor(incident.status),
              fillColor: getIncidentMarkerColor(incident.status),
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <Popup>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">
                  #{incident.id}{' '}
                  <span className="font-mono text-xs">
                    {INCIDENT_TYPE_LABELS[incident.type]}
                  </span>
                </p>
                <p>{incident.description}</p>
                <p className="text-muted-foreground text-xs">
                  {getZoneName(incident.zoneId)}
                </p>
                <StatusBadge
                  kind="incident"
                  status={incident.status}
                  label={INCIDENT_STATUS_LABELS[incident.status]}
                />
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {visibleAssets.length > 0 && (
          <AssetMarkerCluster
            assets={visibleAssets}
            getZoneName={getZoneName}
          />
        )}
      </MapContainer>

      {showLegend && (
        <div className="bg-card/95 border-border absolute bottom-3 left-3 z-[1000] max-w-[220px] rounded-lg border p-3 text-xs backdrop-blur">
          <p className="mb-2 font-medium">Leyenda</p>
          <ul className="text-muted-foreground space-y-1">
            <li>
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-red-500" />
              Reportado / Fuera de servicio
            </li>
            <li>
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-orange-500" />
              En progreso / Dañado
            </li>
            <li>
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-yellow-500" />
              Lleno
            </li>
            <li>
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />
              Resuelto / OK
            </li>
          </ul>
          <p className="text-muted-foreground mt-2">
            {visibleIncidents.length} incidentes · {visibleAssets.length}{' '}
            assets visibles
          </p>
        </div>
      )}
    </div>
  );
}
