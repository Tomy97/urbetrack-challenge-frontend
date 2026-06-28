import { Card } from '@/shared/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { ASSET_STATUS_LABELS, ASSET_TYPE_LABELS } from '@/shared/lib/labels';
import type { UrbanAsset } from '@/shared/types/asset';
import { useZoneLookup } from '@/shared/hooks/useZoneLookup';

interface AssetsCardTableProps {
  items: UrbanAsset[];
}

export const AssetsCardTable = ({ items }: AssetsCardTableProps) => {
  const { getZoneName } = useZoneLookup();

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[90px]">ID</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Zona</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="font-mono text-xs">#{a.id}</TableCell>
              <TableCell>{ASSET_TYPE_LABELS[a.type]}</TableCell>
              <TableCell>
                <StatusBadge
                  kind="asset"
                  status={a.status}
                  label={ASSET_STATUS_LABELS[a.status]}
                />
              </TableCell>
              <TableCell className="text-sm">{a.address}</TableCell>
              <TableCell className="text-muted-foreground">
                {getZoneName(a.zoneId)}
              </TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-muted-foreground py-10 text-center text-sm"
              >
                Sin resultados para los filtros aplicados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};
