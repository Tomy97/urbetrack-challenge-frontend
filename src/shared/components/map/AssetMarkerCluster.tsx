import { Marker, Popup } from 'react-leaflet';
import { divIcon, type DivIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import type { UrbanAsset, AssetStatus } from '@/shared/types/asset';
import {
  getAssetMarkerColor,
  StatusBadge,
} from '@/shared/components/StatusBadge';
import {
  ASSET_STATUS_LABELS,
  ASSET_TYPE_LABELS,
} from '@/shared/lib/labels';
import { ASSET_STATUS_VALUES } from '@/shared/constants/domain';

function createAssetIcon(color: string): DivIcon {
  return divIcon({
    className: '',
    html: `<span style="display:block;width:10px;height:10px;border-radius:50%;background:${color};border:1px solid ${color};box-shadow:0 0 0 1px rgba(255,255,255,0.6)"></span>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });
}

const assetIcons = Object.fromEntries(
  ASSET_STATUS_VALUES.map((status) => [
    status,
    createAssetIcon(getAssetMarkerColor(status)),
  ]),
) as Record<AssetStatus, DivIcon>;

type AssetMarkerClusterProps = {
  assets: UrbanAsset[];
  getZoneName: (zoneId: string) => string;
};

export function AssetMarkerCluster({
  assets,
  getZoneName,
}: AssetMarkerClusterProps) {
  if (assets.length === 0) return null;

  return (
    <MarkerClusterGroup
      chunkedLoading
      removeOutsideVisibleBounds
      maxClusterRadius={60}
      spiderfyOnMaxZoom
      showCoverageOnHover={false}
    >
      {assets.map((asset) => (
        <Marker
          key={`asset-${asset.id}`}
          position={[asset.lat, asset.lng]}
          icon={assetIcons[asset.status]}
        >
          <Popup>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">
                #{asset.id}{' '}
                <span className="font-mono text-xs">
                  {ASSET_TYPE_LABELS[asset.type]}
                </span>
              </p>
              <p>{asset.address}</p>
              <p className="text-muted-foreground text-xs">
                {getZoneName(asset.zoneId)}
              </p>
              <StatusBadge
                kind="asset"
                status={asset.status}
                label={ASSET_STATUS_LABELS[asset.status]}
              />
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}
