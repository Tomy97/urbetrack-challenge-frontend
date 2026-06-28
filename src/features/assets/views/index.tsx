import { useMemo, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { useAssets } from '@/shared/hooks/useAssets';
import { useZoneFilterStore } from '@/shared/store/zone-filter.store';
import { filterByZone } from '@/shared/lib/filters';
import { formatNumber } from '@/shared/lib/format';
import { FILTER_ALL, isFilterAll } from '@/shared/constants/filters';
import type { AssetStatus, AssetType } from '@/shared/types/asset';
import { StatusAssetSelect } from '../components/selects/StatusAssetSelect';
import { TypeAssetSelect } from '../components/selects/TypeAssetSelect';
import { AssetsCardTable } from '../components/cards/AssetsCardTable';

const PAGE_SIZE = 50;

type AssetStatusFilter = AssetStatus | typeof FILTER_ALL;
type AssetTypeFilter = AssetType | typeof FILTER_ALL;

export const AssetsView = () => {
  const zoneId = useZoneFilterStore((s) => s.zoneId);

  const [statusFilter, setStatusFilter] =
    useState<AssetStatusFilter>(FILTER_ALL);
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
        <StatusAssetSelect
          value={statusFilter}
          onChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
        />

        <TypeAssetSelect
          value={typeFilter}
          onChange={(value) => {
            setTypeFilter(value);
            setPage(1);
          }}
        />
      </div>

      <AssetsCardTable items={pageItems} />

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
