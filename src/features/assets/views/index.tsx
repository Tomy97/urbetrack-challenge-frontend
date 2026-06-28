import { useMemo, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { useAssets } from '@/shared/hooks/useAssets';
import { useZoneLookup } from '@/shared/hooks/useZoneLookup';
import { useZoneFilterStore } from '@/shared/store/zone-filter.store';
import { filterByZone } from '@/shared/lib/filters';
import { ASSET_STATUS_LABELS, ASSET_TYPE_LABELS } from '@/shared/lib/labels';
import { formatNumber } from '@/shared/lib/format';
import { ASSET_STATUS, ASSET_TYPE } from '@/shared/constants/domain';
import {
  FILTER_ALL,
  isFilterAll,
} from '@/shared/constants/filters';
import type { AssetStatus, AssetType } from '@/shared/types/asset';

const PAGE_SIZE = 50;

type AssetStatusFilter = AssetStatus | typeof FILTER_ALL;
type AssetTypeFilter = AssetType | typeof FILTER_ALL;

export const AssetsView = () => {
  const zoneId = useZoneFilterStore((s) => s.zoneId);
  const { getZoneName } = useZoneLookup();
  const [statusFilter, setStatusFilter] = useState<AssetStatusFilter>(
    FILTER_ALL,
  );
  const [typeFilter, setTypeFilter] = useState<AssetTypeFilter>(FILTER_ALL);
  const [page, setPage] = useState(1);

  const apiFilters = {
    ...(!isFilterAll(statusFilter) ? { status: statusFilter } : {}),
    ...(!isFilterAll(typeFilter) ? { type: typeFilter } : {}),
  };

  const { data: assets = [], isLoading } = useAssets(
    Object.keys(apiFilters).length ? apiFilters : undefined,
  );

  const filtered = useMemo(
    () => filterByZone(assets, zoneId),
    [assets, zoneId],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  if (isLoading) {
    return (
      <div className="text-muted-foreground p-6 text-sm">Cargando assets…</div>
    );
  }

  return (
    <div className="space-y-4 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Mobiliario urbano
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {formatNumber(filtered.length)} de {formatNumber(assets.length)}{' '}
          assets · paginación de {PAGE_SIZE} por página.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value as AssetStatusFilter);
            setPage(1);
          }}
        >
          <SelectTrigger className="bg-card h-9 w-[180px]">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>Todos los estados</SelectItem>
            <SelectItem value={ASSET_STATUS.OK}>OK</SelectItem>
            <SelectItem value={ASSET_STATUS.FULL}>Lleno</SelectItem>
            <SelectItem value={ASSET_STATUS.DAMAGED}>Dañado</SelectItem>
            <SelectItem value={ASSET_STATUS.OUT_OF_SERVICE}>
              Fuera de servicio
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={typeFilter}
          onValueChange={(value) => {
            setTypeFilter(value as AssetTypeFilter);
            setPage(1);
          }}
        >
          <SelectTrigger className="bg-card h-9 w-[180px]">
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL}>Todos los tipos</SelectItem>
            <SelectItem value={ASSET_TYPE.CONTAINER}>Contenedor</SelectItem>
            <SelectItem value={ASSET_TYPE.BIN}>Tacho</SelectItem>
            <SelectItem value={ASSET_TYPE.BENCH}>Banco</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border-border overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground text-left text-xs uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Dirección</th>
              <th className="px-4 py-3 font-medium">Zona</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((asset) => (
              <tr
                key={asset.id}
                className="border-border hover:bg-muted/20 border-t transition-colors"
              >
                <td className="px-4 py-3 font-mono">#{asset.id}</td>
                <td className="px-4 py-3">{ASSET_TYPE_LABELS[asset.type]}</td>
                <td className="px-4 py-3">
                  <StatusBadge
                    kind="asset"
                    status={asset.status}
                    label={ASSET_STATUS_LABELS[asset.status]}
                  />
                </td>
                <td className="px-4 py-3">{asset.address}</td>
                <td className="px-4 py-3">{getZoneName(asset.zoneId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs">
          Página {currentPage} de {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};
